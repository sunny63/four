import { injectable, inject } from 'inversify';
import { v4 } from 'uuid';
import randomNumber from 'helper/common/randomNumber';
import getRandomRange from 'helper/common/getRandomRange';
import AttributeRepository from 'domain/repository/attribute/AttributeRepository';
import Value from 'domain/entity/attribute/Value';
import Attribute from 'domain/entity/attribute/Attribute';

const ATTRIBUTE_NAME = 'Признак';

@injectable()
export default class GenerateAttributesUseCase {
    @inject(AttributeRepository)
    private readonly attributeRepository!: AttributeRepository;

    // eslint-disable-next-line class-methods-use-this
    private getPossibleValues(): Value {
        const max = randomNumber(3, 99);
        let min = randomNumber(2, max);

        while (min === max) {
            min = randomNumber(2, max);
        }

        return {
            from: min,
            to: max,
        };
    }

    public execute(attributesAmount: number) {
        const attributes: Attribute[] = [];

        for (let i = 1; i <= attributesAmount; i++) {
            const attributeName = `${ATTRIBUTE_NAME} №${i}`;
            const possibleValues = this.getPossibleValues();
            const { from, to } = possibleValues;
            const normalValues = getRandomRange(from, to - 1);
            const attribute = new Attribute(v4(), attributeName, possibleValues, normalValues);

            attributes.push(attribute);
        }

        this.attributeRepository.setAttributes(attributes);
    }
}
