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
import StepInteractor from 'domain/interactor/app/StepInteractor';
import GenerateDiseasesHistoriesUseCase from 'domain/interactor/diseaseHistory/GenerateDiseasesHistoriesUseCase';

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

    @inject(GenerateDiseasesHistoriesUseCase)
    private readonly generateDiseasesHistoriesUseCase!: GenerateDiseasesHistoriesUseCase;

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

        this.generateDiseasesHistoriesUseCase.execute(Number(diseaseHistoriesAmount));
        this.stepInteractor.setShowDiseaseHistoriesStep();
    };

    public setInputDataStep = (): void => {
        this.stepInteractor.setInputDataStep();
    };

    public setSampleGenerationStep = (): void => {
        this.stepInteractor.setSampleGenerationStep();
    };

    public setShowTablesStep = (): void => {
        this.stepInteractor.setShowTablesStep();
    };

    public setShowDiseaseHistoriesStep = (): void => {
        this.stepInteractor.setShowDiseaseHistoriesStep();
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

    public get step(): Step {
        return this.appRepository.getStep();
    }

    public get periods(): Period[] {
        return this.periodRepository.getPeriods();
    }

    public get diseases(): Disease[] {
        return this.diseaseRepository.getDiseases();
    }

    public get attributes(): Attribute[] {
        return this.attributeRepository.getAttributes();
    }

    public get diseaseHistories(): DiseaseHistory[] {
        return this.diseaseHistoryRepository.getDiseasesHistories();
    }

    public get user() {
        return this.appRepository.getUser();
    }
}
