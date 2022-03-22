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

    public setSampleGenerationStep() {
        this.appRepository.setStep(Step.SampleGeneration);
    }

    public setShowDiseaseHistoriesStep() {
        this.appRepository.setStep(Step.ShowDiseaseHistories);
    }

    public setShowTablesStep() {
        this.appRepository.setStep(Step.ShowTables);
    }

    public setShowTablesStatisticStep() {
        this.appRepository.setStep(Step.ShowTablesStatistic);
    }

    public setLoadStateStep() {
        this.appRepository.setStep(Step.LoadState);
    }

    public setIndKnowledgeBaseStep() {
        this.appRepository.setStep(Step.IndKnowledgeBase);
    }

    public setIndKnowledgeBaseGenerationStep() {
        this.appRepository.setStep(Step.IndKnowledgeBaseGeneration);
    }

    public setStatisticStep() {
        this.appRepository.setStep(Step.Statistic);
    }
}
