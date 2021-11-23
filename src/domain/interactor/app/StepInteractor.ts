import { inject, injectable } from 'inversify';
import Step from 'domain/entity/app/Step';
import AppRepository from 'domain/repository/app/AppRepository';

@injectable()
export default class StepInteractor {
    @inject(AppRepository)
    private readonly appRepository!: AppRepository;

    public setInputDataStep() {
        this.appRepository.setStep(Step.InputData);
    }

    public setGeneration2Step() {
        this.appRepository.setStep(Step.Generation2);
    }

    public setShowDiseaseHistoriesStep() {
        this.appRepository.setStep(Step.ShowDiseaseHistories);
    }

    public setShowTablesStep() {
        this.appRepository.setStep(Step.ShowTables);
    }

    public setLoadStateStep() {
        this.appRepository.setStep(Step.LoadState);
    }
}
