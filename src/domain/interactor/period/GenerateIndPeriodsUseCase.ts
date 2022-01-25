import { inject, injectable } from 'inversify';
import { v4 } from 'uuid';
import Attribute from 'domain/entity/attribute/Attribute';
import Value from 'domain/entity/attribute/Value';
import Disease from 'domain/entity/disease/Disease';
import MomentOfObservation from 'domain/entity/diseaseHistory/MomentOfObservation';
import Alternative from 'domain/entity/alternative/Alternative';
import Period from 'domain/entity/period/Period';
import Bound from 'domain/entity/period/Bound';
import DiseaseHistoryRepository from 'domain/repository/diseaseHistory/DiseaseHistoryRepository';
import DiseaseRepository from 'domain/repository/disease/DiseaseRepository';
import AttributeRepository from 'domain/repository/attribute/AttributeRepository';
import IndPeriodRepository from 'domain/repository/period/IndPeriodRepository';

@injectable()
export default class GenerateIndPeriodsUseCase {
    @inject(DiseaseHistoryRepository)
    private readonly diseaseHistoryRepository!: DiseaseHistoryRepository;

    @inject(AttributeRepository)
    private readonly attributeRepository!: AttributeRepository;

    @inject(DiseaseRepository)
    private readonly diseaseRepository!: DiseaseRepository;

    @inject(IndPeriodRepository)
    private readonly indPeriodRepository!: IndPeriodRepository;

    // eslint-disable-next-line class-methods-use-this
    private mergeAlternatives(periodsAmount: number, alternatives: Alternative[]): Alternative {
        const values: Value[] = [];
        const bounds: Bound[] = [];

        for (let i = 0; i < periodsAmount; i++) {
            let fromValue = alternatives[0].values[i].from;
            let toValue = alternatives[0].values[i].to;
            let lowerBoundValue = alternatives[0].bounds[i].lowerBound;
            let upperBoundValue = alternatives[0].bounds[i].upperBound;

            alternatives.forEach((alternative) => {
                const { from, to } = alternative.values[i];
                const { lowerBound, upperBound } = alternative.bounds[i];

                if (fromValue > from) {
                    fromValue = from;
                }

                if (toValue < to) {
                    toValue = to;
                }

                if (lowerBoundValue > lowerBound) {
                    lowerBoundValue = lowerBound;
                }

                if (upperBoundValue < upperBound) {
                    upperBoundValue = upperBound;
                }
            });

            const value: Value = {
                from: fromValue,
                to: toValue,
            };
            const bound: Bound = {
                lowerBound: lowerBoundValue,
                upperBound: upperBoundValue,
            };

            values.push(value);
            bounds.push(bound);
        }

        return new Alternative(periodsAmount, values, bounds);
    }

    // eslint-disable-next-line class-methods-use-this
    private getValuesForMomentsInPeriod(moments: MomentOfObservation[]): Value {
        let minValue = moments[0].value;
        let maxValue = moments[0].value;

        moments.forEach(({ value }) => {
            if (value < minValue) {
                minValue = value;
            }

            if (value > maxValue) {
                maxValue = value;
            }
        });

        return {
            from: minValue,
            to: maxValue,
        };
    }

    // eslint-disable-next-line class-methods-use-this
    private checkValues(value1: Value, value2: Value): boolean {
        const { from: from1, to: to1 } = value1;
        const { from: from2, to: to2 } = value2;

        if (from1 >= from2 && from1 <= to2) {
            return false;
        }

        if (to1 >= from2 && to1 <= to2) {
            return false;
        }

        if (from2 >= from1 && from2 <= to1) {
            return false;
        }

        if (to2 >= from1 && to2 <= to1) {
            return false;
        }

        return true;
    }

    private checkFullValues(values: Value[]): boolean {
        for (let i = 0; i < values.length - 1; i++) {
            if (!this.checkValues(values[i], values[i + 1])) {
                return false;
            }
        }

        return true;
    }

    private getAlternativesFor5Periods(momentsOfObservation: MomentOfObservation[]): Alternative[] {
        const alternatives: Alternative[] = [];

        for (let i = 1; i < momentsOfObservation.length - 3; i++) {
            for (let j = i + 1; j < momentsOfObservation.length - 2; j++) {
                for (let k = j + 1; k < momentsOfObservation.length - 1; k++) {
                    for (let l = k + 1; l < momentsOfObservation.length; l++) {
                        const moments1 = momentsOfObservation.slice(0, i);
                        const moments2 = momentsOfObservation.slice(i, j);
                        const moments3 = momentsOfObservation.slice(j, k);
                        const moments4 = momentsOfObservation.slice(k, l);
                        const moments5 = momentsOfObservation.slice(l, momentsOfObservation.length);
                        const value1 = this.getValuesForMomentsInPeriod(moments1);
                        const value2 = this.getValuesForMomentsInPeriod(moments2);
                        const value3 = this.getValuesForMomentsInPeriod(moments3);
                        const value4 = this.getValuesForMomentsInPeriod(moments4);
                        const value5 = this.getValuesForMomentsInPeriod(moments5);
                        const values = [value1, value2, value3, value4, value5];

                        if (this.checkFullValues(values)) {
                            const bound1: Bound = {
                                lowerBound: moments1[0].duration,
                                upperBound: moments1[moments1.length - 1].duration,
                            };
                            const bound2: Bound = {
                                lowerBound:
                                    moments2[0].duration -
                                    Math.round(
                                        moments2[0].duration -
                                            moments1[moments1.length - 1].duration,
                                    ),
                                upperBound:
                                    moments2[moments2.length - 1].duration -
                                    Math.round(
                                        moments2[0].duration -
                                            moments1[moments1.length - 1].duration,
                                    ),
                            };
                            const bound3: Bound = {
                                lowerBound:
                                    moments3[0].duration -
                                    Math.round(
                                        moments3[0].duration -
                                            moments2[moments2.length - 1].duration,
                                    ),
                                upperBound:
                                    moments3[moments3.length - 1].duration -
                                    Math.round(
                                        moments3[0].duration -
                                            moments2[moments2.length - 1].duration,
                                    ),
                            };
                            const bound4: Bound = {
                                lowerBound:
                                    moments4[0].duration -
                                    Math.round(
                                        moments4[0].duration -
                                            moments3[moments3.length - 1].duration,
                                    ),
                                upperBound:
                                    moments4[moments4.length - 1].duration -
                                    Math.round(
                                        moments4[0].duration -
                                            moments3[moments3.length - 1].duration,
                                    ),
                            };
                            const bound5: Bound = {
                                lowerBound:
                                    moments5[0].duration -
                                    Math.round(
                                        moments5[0].duration -
                                            moments4[moments4.length - 1].duration,
                                    ),
                                upperBound:
                                    moments5[moments5.length - 1].duration -
                                    Math.round(
                                        moments5[0].duration -
                                            moments4[moments4.length - 1].duration,
                                    ),
                            };
                            const bounds: Bound[] = [bound1, bound2, bound3, bound4, bound5];
                            const alternative = new Alternative(5, values, bounds);

                            alternatives.push(alternative);
                        }
                    }
                }
            }
        }

        return alternatives;
    }

    private getAlternativesFor4Periods(momentsOfObservation: MomentOfObservation[]): Alternative[] {
        const alternatives: Alternative[] = [];

        for (let i = 1; i < momentsOfObservation.length - 2; i++) {
            for (let j = i + 1; j < momentsOfObservation.length - 1; j++) {
                for (let k = j + 1; k < momentsOfObservation.length; k++) {
                    const moments1 = momentsOfObservation.slice(0, i);
                    const moments2 = momentsOfObservation.slice(i, j);
                    const moments3 = momentsOfObservation.slice(j, k);
                    const moments4 = momentsOfObservation.slice(k, momentsOfObservation.length);
                    const value1 = this.getValuesForMomentsInPeriod(moments1);
                    const value2 = this.getValuesForMomentsInPeriod(moments2);
                    const value3 = this.getValuesForMomentsInPeriod(moments3);
                    const value4 = this.getValuesForMomentsInPeriod(moments4);
                    const values = [value1, value2, value3, value4];

                    if (this.checkFullValues(values)) {
                        const bound1: Bound = {
                            lowerBound: moments1[0].duration,
                            upperBound: moments1[moments1.length - 1].duration,
                        };
                        const bound2: Bound = {
                            lowerBound:
                                moments2[0].duration -
                                Math.round(
                                    moments2[0].duration - moments1[moments1.length - 1].duration,
                                ),
                            upperBound:
                                moments2[moments2.length - 1].duration -
                                Math.round(
                                    moments2[0].duration - moments1[moments1.length - 1].duration,
                                ),
                        };
                        const bound3: Bound = {
                            lowerBound:
                                moments3[0].duration -
                                Math.round(
                                    moments3[0].duration - moments2[moments2.length - 1].duration,
                                ),
                            upperBound:
                                moments3[moments3.length - 1].duration -
                                Math.round(
                                    moments3[0].duration - moments2[moments2.length - 1].duration,
                                ),
                        };
                        const bound4: Bound = {
                            lowerBound:
                                moments4[0].duration -
                                Math.round(
                                    moments4[0].duration - moments3[moments3.length - 1].duration,
                                ),
                            upperBound:
                                moments4[moments4.length - 1].duration -
                                Math.round(
                                    moments4[0].duration - moments3[moments3.length - 1].duration,
                                ),
                        };
                        const bounds: Bound[] = [bound1, bound2, bound3, bound4];
                        const alternative = new Alternative(4, values, bounds);

                        alternatives.push(alternative);
                    }
                }
            }
        }

        return alternatives;
    }

    private getAlternativesFor3Periods(momentsOfObservation: MomentOfObservation[]): Alternative[] {
        const alternatives: Alternative[] = [];

        for (let i = 1; i < momentsOfObservation.length - 1; i++) {
            for (let j = i + 1; j < momentsOfObservation.length; j++) {
                const moments1 = momentsOfObservation.slice(0, i);
                const moments2 = momentsOfObservation.slice(i, j);
                const moments3 = momentsOfObservation.slice(j, momentsOfObservation.length);
                const value1 = this.getValuesForMomentsInPeriod(moments1);
                const value2 = this.getValuesForMomentsInPeriod(moments2);
                const value3 = this.getValuesForMomentsInPeriod(moments3);
                const values = [value1, value2, value3];

                if (this.checkFullValues(values)) {
                    const bound1: Bound = {
                        lowerBound: moments1[0].duration,
                        upperBound: moments1[moments1.length - 1].duration,
                    };
                    const bound2: Bound = {
                        lowerBound:
                            moments2[0].duration -
                            Math.round(
                                moments2[0].duration - moments1[moments1.length - 1].duration,
                            ),
                        upperBound:
                            moments2[moments2.length - 1].duration -
                            Math.round(
                                moments2[0].duration - moments1[moments1.length - 1].duration,
                            ),
                    };
                    const bound3: Bound = {
                        lowerBound:
                            moments3[0].duration -
                            Math.round(
                                moments3[0].duration - moments2[moments2.length - 1].duration,
                            ),
                        upperBound:
                            moments3[moments3.length - 1].duration -
                            Math.round(
                                moments3[0].duration - moments2[moments2.length - 1].duration,
                            ),
                    };
                    const bounds: Bound[] = [bound1, bound2, bound3];
                    const alternative = new Alternative(3, values, bounds);

                    alternatives.push(alternative);
                }
            }
        }

        return alternatives;
    }

    private getAlternativesFor2Periods(momentsOfObservation: MomentOfObservation[]): Alternative[] {
        const alternatives: Alternative[] = [];

        for (let i = 1; i < momentsOfObservation.length; i++) {
            const moments1 = momentsOfObservation.slice(0, i);
            const moments2 = momentsOfObservation.slice(i, momentsOfObservation.length);
            const value1 = this.getValuesForMomentsInPeriod(moments1);
            const value2 = this.getValuesForMomentsInPeriod(moments2);

            if (this.checkValues(value1, value2)) {
                const values = [value1, value2];
                const bound1: Bound = {
                    lowerBound: moments1[0].duration,
                    upperBound: moments1[moments1.length - 1].duration,
                };
                const bound2: Bound = {
                    lowerBound:
                        moments2[0].duration -
                        Math.round(moments2[0].duration - moments1[moments1.length - 1].duration),
                    upperBound:
                        moments2[moments2.length - 1].duration -
                        Math.round(moments2[0].duration - moments1[moments1.length - 1].duration),
                };
                const bounds = [bound1, bound2];
                const alternative = new Alternative(2, values, bounds);

                alternatives.push(alternative);
            }
        }

        return alternatives;
    }

    // eslint-disable-next-line class-methods-use-this
    private getAlternatives(momentsOfObservation: MomentOfObservation[]): Alternative[] {
        const alternatives: Alternative[] = [];
        const moments = momentsOfObservation.sort((a, b) => {
            if (a.duration < b.duration) {
                return -1;
            }

            if (a.duration > b.duration) {
                return 1;
            }

            return 0;
        });
        const maxPeriodsAmount = moments.length > 5 ? 5 : moments.length;

        for (let i = 1; i <= maxPeriodsAmount; ++i) {
            if (i === 1) {
                const values = [this.getValuesForMomentsInPeriod(moments)];
                const lowerBound = moments[0].duration;
                const upperBound = moments[moments.length - 1].duration;
                const bound: Bound = {
                    lowerBound,
                    upperBound,
                };
                const alternative = new Alternative(1, values, [bound]);

                alternatives.push(alternative);
            }

            if (i === 2) {
                const alternatives2 = this.getAlternativesFor2Periods(momentsOfObservation);

                alternatives2.forEach((alternative) => alternatives.push(alternative));
            }

            if (i === 3) {
                const alternatives3 = this.getAlternativesFor3Periods(momentsOfObservation);

                alternatives3.forEach((alternative) => alternatives.push(alternative));
            }

            if (i === 4) {
                const alternatives4 = this.getAlternativesFor4Periods(momentsOfObservation);

                alternatives4.forEach((alternative) => alternatives.push(alternative));
            }

            if (i === 5) {
                const alternatives5 = this.getAlternativesFor5Periods(momentsOfObservation);

                alternatives5.forEach((alternative) => alternatives.push(alternative));
            }
        }

        return alternatives;
    }

    public execute(): void {
        const diseaseHistories = this.diseaseHistoryRepository.getDiseasesHistories();
        const diseases = this.diseaseRepository.getDiseases();
        const attributes = this.attributeRepository.getAttributes();
        const momentsForAttribute: Record<
            Disease['id'],
            Record<Attribute['id'], MomentOfObservation[]>
        > = {};
        const indPeriods: Period[] = [];

        diseaseHistories.forEach(({ period, momentsOfObservation }) => {
            const { disease, attribute } = period;
            const { id: diseaseId } = disease;
            const { id: attributeId } = attribute;

            if (momentsForAttribute[diseaseId]) {
                if (momentsForAttribute[diseaseId][attributeId]) {
                    const prevMoments = momentsForAttribute[diseaseId][attributeId];

                    momentsForAttribute[diseaseId][attributeId] = [
                        ...prevMoments,
                        ...momentsOfObservation,
                    ];
                } else {
                    momentsForAttribute[diseaseId][attributeId] = momentsOfObservation;
                }
            } else {
                momentsForAttribute[diseaseId] = {};
                momentsForAttribute[diseaseId][attributeId] = momentsOfObservation;
            }
        });

        diseases.forEach((disease) => {
            attributes.forEach((attribute) => {
                const moments = momentsForAttribute[disease.id][attribute.id];
                const alternatives = this.getAlternatives(moments);
                const alternatives1 = alternatives.filter(
                    ({ periodsAmount }) => periodsAmount === 1,
                );
                const alternatives2 =
                    alternatives.filter(({ periodsAmount }) => periodsAmount === 2) || [];
                const alternatives3 =
                    alternatives.filter(({ periodsAmount }) => periodsAmount === 3) || [];
                const alternatives4 =
                    alternatives.filter(({ periodsAmount }) => periodsAmount === 4) || [];
                const alternatives5 =
                    alternatives.filter(({ periodsAmount }) => periodsAmount === 5) || [];
                const mergedAlternatives: Alternative[] = [...alternatives1];

                if (alternatives2.length > 0) {
                    const alternative2 = this.mergeAlternatives(2, alternatives2);

                    mergedAlternatives.push(alternative2);
                }

                if (alternatives3.length > 0) {
                    const alternative3 = this.mergeAlternatives(3, alternatives3);

                    mergedAlternatives.push(alternative3);
                }

                if (alternatives4.length > 0) {
                    const alternative4 = this.mergeAlternatives(4, alternatives4);

                    mergedAlternatives.push(alternative4);
                }

                if (alternatives5.length > 0) {
                    const alternative5 = this.mergeAlternatives(5, alternatives5);

                    mergedAlternatives.push(alternative5);
                }

                const checkedAlternatives =
                    mergedAlternatives.filter((alternative) =>
                        this.checkFullValues(alternative.values),
                    ) || [];

                const periods = checkedAlternatives.map(
                    ({ periodsAmount, bounds, values }) =>
                        new Period(v4(), disease, attribute, periodsAmount, values, bounds),
                );

                indPeriods.push(...periods);
            });
        });

        this.indPeriodRepository.setPeriods(indPeriods);
    }
}
