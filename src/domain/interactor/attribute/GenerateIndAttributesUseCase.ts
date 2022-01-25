import { injectable, inject } from 'inversify';
import Attribute from 'domain/entity/attribute/Attribute';
import AttributeRepository from 'domain/repository/attribute/AttributeRepository';
import IndAttributeRepository from 'domain/repository/attribute/IndAttributeRepository';
import DiseaseHistoryRepository from 'domain/repository/diseaseHistory/DiseaseHistoryRepository';

@injectable()
export default class GenerateIndAttributesUseCase {
    @inject(AttributeRepository)
    private readonly attributeRepository!: AttributeRepository;

    @inject(IndAttributeRepository)
    private readonly indAttributeRepository!: IndAttributeRepository;

    @inject(DiseaseHistoryRepository)
    private readonly diseaseHistoryRepository!: DiseaseHistoryRepository;

    public execute(): void {
        const diseaseHistories = this.diseaseHistoryRepository.getDiseasesHistories();
        const attributes = this.attributeRepository.getAttributes();

        diseaseHistories.forEach(({ period, momentsOfObservation }) => {
            const {
                attribute: { id: attributeId },
            } = period;

            momentsOfObservation?.forEach(({ value }) => {
                this.indAttributeRepository.setAttributeValue(attributeId, value);
            });
        });

        const indAttributes = attributes.map(({ id, name }) => {
            const attributeValues = this.indAttributeRepository.getAttributeValues(id);
            let minValue = attributeValues[0];
            let maxValue = attributeValues[0];

            attributeValues.forEach((value) => {
                if (value < minValue) {
                    minValue = value;
                }

                if (value > maxValue) {
                    maxValue = value;
                }
            });

            return new Attribute(
                id,
                name,
                {
                    from: minValue,
                    to: maxValue,
                },
                {
                    from: 0,
                    to: 0,
                },
            );
        });

        this.indAttributeRepository.setAttributes(indAttributes);
    }
}
