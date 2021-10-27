import { injectable, inject } from 'inversify';
import AttributeRepository from 'domain/repository/attribute/AttributeRepository';

@injectable()
export default class GenerateAttributesUseCase {
    @inject(AttributeRepository)
    private readonly attributeRepository!: AttributeRepository;

    public execute(attributesAmount: number, possibleValues: number) {
        const attributes = this.attributeRepository.generateAttributes(attributesAmount, possibleValues);

        this.attributeRepository.setAttributes(attributes);
    }
}
