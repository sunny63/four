import { injectable, inject } from 'inversify';
import { v4 } from 'uuid';
import DiseaseHistory from 'domain/entity/diseaseHistory/DiseaseHistory';
import MomentOfObservation from 'domain/entity/diseaseHistory/MomentOfObservation';
import DiseaseHistoryRepository from 'domain/repository/diseaseHistory/DiseaseHistoryRepository';
import PeriodRepository from 'domain/repository/period/PeriodRepository';
import randomNumber from 'helper/common/randomNumber';

@injectable()
export default class GenerateDiseasesHistoriesUseCase {
    @inject(DiseaseHistoryRepository)
    private readonly diseaseHistoryRepository!: DiseaseHistoryRepository;

    @inject(PeriodRepository)
    private readonly periodRepository!: PeriodRepository;

    public execute(diseaseHistoriesAmount: number) {
        const periods = this.periodRepository.getPeriods();
        const diseaseHistories: DiseaseHistory[] = [];

        for (let i = 0; i < diseaseHistoriesAmount; i++) {
            periods.forEach((period) => {
                const { values, bounds } = period;

                bounds?.forEach(({ upperBound, lowerBound }, index) => {
                    const { from, to } = values[index];
                    const periodDuration = randomNumber(lowerBound, upperBound);
                    const diseaseHistory = new DiseaseHistory(v4(), period, index, periodDuration);
                    let momentsOfObservationDurationCounter = periodDuration;

                    while (momentsOfObservationDurationCounter > 0) {
                        const momentOfObservationDuration = randomNumber(
                            1,
                            momentsOfObservationDurationCounter,
                        );
                        const momentOfObservationValue = randomNumber(from, to);
                        const momentOfObservation = new MomentOfObservation(
                            momentOfObservationDuration,
                            momentOfObservationValue,
                        );

                        diseaseHistory.momentsOfObservation.push(momentOfObservation);
                        momentsOfObservationDurationCounter -= momentOfObservationDuration;
                    }

                    diseaseHistories.push(diseaseHistory);
                });
            });
        }

        this.diseaseHistoryRepository.setDiseaseHistories(diseaseHistories);
    }
}
