import { inject, injectable } from 'inversify';
import { SubmitHandlerT } from 'presentation/type/Formik';
import FormData from 'domain/entity/app/FormData';
import Period from 'domain/entity/period/Period';
import Disease from 'domain/entity/disease/Disease';
import Attribute from 'domain/entity/attribute/Attribute';
import Step from 'domain/entity/app/Step';
import AppRepository from 'domain/repository/app/AppRepository';
import PeriodRepository from 'domain/repository/period/PeriodRepository';
import DiseaseRepository from 'domain/repository/disease/DiseaseRepository';
import AttributeRepository from 'domain/repository/attribute/AttributeRepository';
import GenerateDiseasesUseCase from 'domain/interactor/disease/GenerateDiseasesUseCase';
import GenerateAttributesUseCase from 'domain/interactor/attribute/GenerateAttributesUseCase';
import GeneratePeriodsUseCase from 'domain/interactor/period/GeneratePeriodsUseCase';
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

    public handleFormSubmit: SubmitHandlerT<FormData> = (formData) => {
        const {
            diseasesAmount,
            attributesAmount,
            periodsAmount,
        } = formData;

        this.generateDiseasesUseCase.execute(Number(diseasesAmount));
        this.generateAttributesUseCase.execute(Number(attributesAmount));
        this.generatePeriodsUseCase.execute(Number(periodsAmount));
        this.stepInteractor.setShowTablesStep();
    }

    public setInputDataStep = (): void => {
        this.stepInteractor.setInputDataStep();
    }

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

    public get user() {
        return this.appRepository.getUser();
    }
}
