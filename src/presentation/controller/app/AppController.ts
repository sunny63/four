import { inject, injectable } from 'inversify';
import getStringInterval from 'helper/string/getStringInterval';
import { SubmitHandlerT } from 'presentation/type/Formik';
import FormData from 'domain/entity/app/FormData';
import Period from 'domain/entity/period/Period';
import PeriodForDownloading from 'domain/entity/period/PeriodForDownloading';
import Disease from 'domain/entity/disease/Disease';
import Attribute from 'domain/entity/attribute/Attribute';
import AttributeForDownloading from 'domain/entity/attribute/AttributeForDownloading';
import AmountOfPeriods from 'domain/entity/AmountOfPeriods';
import Step from 'domain/entity/app/Step';
import DiseaseHistory from 'domain/entity/diseaseHistory/DiseaseHistory';
import DiseaseHistoriesFormData from 'domain/entity/diseaseHistory/DiseaseHistoriesFormData';
import AppRepository from 'domain/repository/app/AppRepository';
import PeriodRepository from 'domain/repository/period/PeriodRepository';
import DiseaseRepository from 'domain/repository/disease/DiseaseRepository';
import AttributeRepository from 'domain/repository/attribute/AttributeRepository';
import DiseaseHistoryRepository from 'domain/repository/diseaseHistory/DiseaseHistoryRepository';
import GenerateDiseasesUseCase from 'domain/interactor/disease/GenerateDiseasesUseCase';
import GenerateAttributesUseCase from 'domain/interactor/attribute/GenerateAttributesUseCase';
import GeneratePeriodsUseCase from 'domain/interactor/period/GeneratePeriodsUseCase';
import GenerateIndAttributesUseCase from 'domain/interactor/attribute/GenerateIndAttributesUseCase';
import IndAttributeRepository from 'domain/repository/attribute/IndAttributeRepository';
import GenerateIndPeriodsUseCase from 'domain/interactor/period/GenerateIndPeriodsUseCase';
import IndPeriodRepository from 'domain/repository/period/IndPeriodRepository';
import StepInteractor from 'domain/interactor/app/StepInteractor';

@injectable()
export default class AppController {
    @inject(AppRepository)
    private readonly appRepository!: AppRepository;

    @inject(PeriodRepository)
    private readonly periodRepository!: PeriodRepository;

    @inject(DiseaseRepository)
    private readonly diseaseRepository!: DiseaseRepository;

    @inject(AttributeRepository)
    private readonly attributeRepository!: AttributeRepository;

    @inject(GenerateDiseasesUseCase)
    private readonly generateDiseasesUseCase!: GenerateDiseasesUseCase;

    @inject(GenerateAttributesUseCase)
    private readonly generateAttributesUseCase!: GenerateAttributesUseCase;

    @inject(GeneratePeriodsUseCase)
    private readonly generatePeriodsUseCase!: GeneratePeriodsUseCase;

    @inject(StepInteractor)
    private readonly stepInteractor!: StepInteractor;

    @inject(DiseaseHistoryRepository)
    private readonly diseaseHistoryRepository!: DiseaseHistoryRepository;

    @inject(GenerateIndAttributesUseCase)
    private readonly generateIndAttributesUseCase!: GenerateIndAttributesUseCase;

    @inject(IndAttributeRepository)
    private readonly indAttributeRepository!: IndAttributeRepository;

    @inject(GenerateIndPeriodsUseCase)
    private readonly generateIndPeriodsUseCase!: GenerateIndPeriodsUseCase;

    @inject(IndPeriodRepository)
    private readonly indPeriodRepository!: IndPeriodRepository;

    public handleFormSubmit: SubmitHandlerT<FormData> = (formData) => {
        const { diseasesAmount, attributesAmount, periodsAmount } = formData;

        this.generateDiseasesUseCase.execute(Number(diseasesAmount));
        this.generateAttributesUseCase.execute(Number(attributesAmount));
        this.generatePeriodsUseCase.execute(Number(periodsAmount));
        this.stepInteractor.setShowTablesStep();
    };

    public handleDiseaseHistoriesFormHandle: SubmitHandlerT<DiseaseHistoriesFormData> = (
        formData,
    ) => {
        const { diseaseHistoriesAmount } = formData;

        this.diseaseHistoryRepository.setAmount(Number(diseaseHistoriesAmount));
        this.stepInteractor.setShowDiseaseHistoriesStep();
    };

    public setInputDataStep = (): void => {
        this.stepInteractor.setInputDataStep();
    };

    public setSampleGenerationStep = (): void => {
        this.stepInteractor.setSampleGenerationStep();
        this.diseaseHistoryRepository.setDiseaseHistories([]);
    };

    public setShowTablesStep = (): void => {
        this.stepInteractor.setShowTablesStep();
    };

    public setShowDiseaseHistoriesStep = (): void => {
        this.stepInteractor.setShowDiseaseHistoriesStep();
    };

    public setIndKnowledgeBaseStep = () => {
        this.stepInteractor.setIndKnowledgeBaseStep();
    };

    public setIndKnowledgeBaseGenerationStep = () => {
        this.stepInteractor.setIndKnowledgeBaseGenerationStep();
    };

    public setLoadState = (): void => {
        this.stepInteractor.setLoadStateStep();
    };

    public handleIndKnowledgeGenerationButtonClick = () => {
        this.stepInteractor.setLoadStateStep();
        this.generateIndAttributesUseCase.execute();
        this.generateIndPeriodsUseCase.execute();
        this.stepInteractor.setIndKnowledgeBaseStep();
    };

    public getAttributesForDownloading = async (
        attributes: Attribute[],
    ): Promise<AttributeForDownloading[]> => {
        const attributesForDownloading: AttributeForDownloading[] = [];

        attributes.forEach(({ name, normalValues, possibleValues }) => {
            const attributeForDownloading: AttributeForDownloading = {
                name,
                possibleValues: getStringInterval(possibleValues),
                normalValues: getStringInterval(normalValues),
            };

            attributesForDownloading.push(attributeForDownloading);
        });

        return attributesForDownloading;
    };

    public getAmountOfPeriodsForDownloading = async (
        periods: Period[],
    ): Promise<AmountOfPeriods[]> => {
        const amountsOfPeriods: AmountOfPeriods[] = [];

        periods.forEach(({ disease, attribute, amount }) => {
            const amountOfPeriods: AmountOfPeriods = {
                disease: disease.name,
                attribute: attribute.name,
                amount,
            };

            amountsOfPeriods.push(amountOfPeriods);
        });

        return amountsOfPeriods;
    };

    public getPeriodsForDownloading = async (
        periods: Period[],
    ): Promise<PeriodForDownloading[]> => {
        const periodsForDownloading: PeriodForDownloading[] = [];

        periods.forEach((period) => {
            const { values, amount, attribute, disease, bounds } = period;

            values.forEach((periodValue, index) => {
                const periodForDownloading: PeriodForDownloading = {
                    disease: disease.name,
                    attribute: attribute.name,
                    amountOfPeriods: amount,
                    period: index + 1,
                    value: getStringInterval(periodValue),
                    lowerBound: bounds[index].lowerBound,
                    upperBound: bounds[index].upperBound,
                };

                periodsForDownloading.push(periodForDownloading);
            });
        });

        return periodsForDownloading;
    };

    public setDiseaseHistories = (diseaseHistories: DiseaseHistory[]) => {
        this.diseaseHistoryRepository.setDiseaseHistories(diseaseHistories);
    };

    public get step(): Step {
        return this.appRepository.getStep();
    }

    public get periods(): Period[] {
        return this.periodRepository.getPeriods();
    }

    public get indPeriods(): Period[] {
        return this.indPeriodRepository.getPeriods();
    }

    public get diseases(): Disease[] {
        return this.diseaseRepository.getDiseases();
    }

    public get attributes(): Attribute[] {
        return this.attributeRepository.getAttributes();
    }

    public get indAttributes(): Attribute[] {
        return this.indAttributeRepository.getAttributes();
    }

    public get diseaseHistories(): DiseaseHistory[] {
        return this.diseaseHistoryRepository.getDiseasesHistories();
    }

    public get diseaseHistoriesAmount(): number {
        return this.diseaseHistoryRepository.getAmount();
    }

    public get hasHistories(): boolean {
        return this.diseaseHistoryRepository.getDiseasesHistories().length > 0;
    }

    public get hasIndAttributes(): boolean {
        return this.indAttributeRepository.getAttributes().length > 0;
    }

    public get user() {
        return this.appRepository.getUser();
    }
}
