import { inject, injectable } from 'inversify';
import { SubmitHandlerT } from 'presentation/type/Formik';
import FormData from 'domain/entity/app/FormData';
import AppRepository from 'domain/repository/app/AppRepository';
import GenerateDiseasesUseCase from 'domain/interactor/disease/GenerateDiseasesUseCase';
import GenerateAttributesUseCase from 'domain/interactor/attribute/GenerateAttributesUseCase';
import GeneratePeriodsUseCase from 'domain/interactor/period/GeneratePeriodsUseCase';

@injectable()
export default class AppController {
    @inject(AppRepository)
    private readonly appRepository!: AppRepository;

    @inject(GenerateDiseasesUseCase)
    private readonly generateDiseasesUseCase!: GenerateDiseasesUseCase;

    @inject(GenerateAttributesUseCase)
    private readonly generateAttributesUseCase!: GenerateAttributesUseCase;

    @inject(GeneratePeriodsUseCase)
    private readonly generatePeriodsUseCase!: GeneratePeriodsUseCase;

    public handleFormSubmit: SubmitHandlerT<FormData> = (formData) => {
        const {
            diseasesAmount,
            attributesAmount,
            possibleValues,
            periodsAmount,
            upperBound,
        } = formData;

        this.generateDiseasesUseCase.execute(diseasesAmount);
        this.generateAttributesUseCase.execute(attributesAmount, possibleValues);
        this.generatePeriodsUseCase.execute(periodsAmount, upperBound);
    }

    public get user() {
        return this.appRepository.getUser();
    }
}
