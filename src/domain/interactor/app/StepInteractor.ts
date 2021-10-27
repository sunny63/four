import {inject, injectable} from 'inversify';
import Step from 'domain/entity/app/Step';
import AppRepository from 'domain/repository/app/AppRepository';

@injectable()
export default class StepInteractor {
    @inject(AppRepository)
    private readonly appRepository!: AppRepository;

    public setInputDataStep() {
        this.appRepository.setStep(Step.InputData);
    }

    public setShowTablesStep() {
        this.appRepository.setStep(Step.ShowTables);
    }

    public setLoadStateStep() {
        this.appRepository.setStep(Step.LoadState);
    }
}
