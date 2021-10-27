import { injectable, inject } from 'inversify';
import AttributeRepository from 'domain/repository/attribute/AttributeRepository';

@injectable()
export default class GenerateAttributesUseCase {
    @inject(AttributeRepository)
    private readonly attributeRepository!: AttributeRepository;

    public execute(attributesAmount: number) {
        const attributes = this.attributeRepository.generateAttributes(attributesAmount);

        this.attributeRepository.setAttributes(attributes);
    }
}
