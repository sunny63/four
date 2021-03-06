import { injectable, inject } from 'inversify';
import { v4 } from 'uuid';
import Period from 'domain/entity/period/Period';
import Bound from 'domain/entity/period/Bound';
import Value from 'domain/entity/attribute/Value';
import PeriodRepository from 'domain/repository/period/PeriodRepository';
import DiseaseRepository from 'domain/repository/disease/DiseaseRepository';
import AttributeRepository from 'domain/repository/attribute/AttributeRepository';
import randomNumber from 'helper/common/randomNumber';
import getRandomRange from 'helper/common/getRandomRange';

@injectable()
export default class GeneratePeriodsUseCase {
    @inject(PeriodRepository)
    private readonly periodRepository!: PeriodRepository;

    @inject(DiseaseRepository)
    private readonly diseaseRepository!: DiseaseRepository;

    @inject(AttributeRepository)
    private readonly attributeRepository!: AttributeRepository;

    // eslint-disable-next-line class-methods-use-this
    private getValuesForPeriod(periodAmount: number, possibleValues: Value): Value[] {
        const { from, to } = possibleValues;
        let prevValue: Value = {
            from: -1,
            to: -1,
        };
        const values: Value[] = [];

        for (let i = 0; i < periodAmount; i++) {
            let currentValue: Value;
            const { from: prevFrom, to: prevTo } = prevValue;

            if (prevFrom === -1) {
                currentValue = getRandomRange(from, to - 1);
            } else if (prevFrom - from > to - 1 - prevTo) {
                currentValue = getRandomRange(from, prevFrom - 1);
            } else {
                currentValue = getRandomRange(prevTo + 1, to - 1);
            }

            prevValue = currentValue;
            values.push(currentValue);
        }

        return values;
    }

    // eslint-disable-next-line class-methods-use-this
    private getBoundsForPeriod(periodAmount: number, upperBound: number): Bound[] {
        const bounds: Bound[] = [];

        for (let i = 0; i < periodAmount; i++) {
            const upperBoundValue = randomNumber(2, upperBound);
            const lowerBoundValue = randomNumber(1, upperBoundValue - 1);
            const bound: Bound = {
                lowerBound: lowerBoundValue,
                upperBound: upperBoundValue,
            };

            bounds.push(bound);
        }

        return bounds;
    }

    public execute(periodsAmount: number) {
        const periods: Period[] = [];
        const diseases = this.diseaseRepository.getDiseases();
        const attributes = this.attributeRepository.getAttributes();

        diseases.forEach((disease) => {
            attributes.forEach((attribute) => {
                const { possibleValues } = attribute;
                const periodAmount = randomNumber(1, periodsAmount);
                const valuesForPeriod = this.getValuesForPeriod(periodAmount, possibleValues);
                const boundsForPeriod = this.getBoundsForPeriod(periodAmount, 12);
                const period = new Period(
                    v4(),
                    disease,
                    attribute,
                    periodAmount,
                    valuesForPeriod,
                    boundsForPeriod,
                );

                periods.push(period);
            });
        });

        this.periodRepository.setPeriods(periods);
    }
}
