import { injectable } from 'inversify';
import { v4 } from 'uuid';
import Attribute from 'domain/entity/attribute/Attribute';
import Value from 'domain/entity/attribute/Value';
import AttributeRepository from 'domain/repository/attribute/AttributeRepository';
import AttributesStore from 'data/store/AttributesStore';
import randomNumber from 'helper/common/randomNumber';

const ATTRIBUTE_NAME = 'Признак'

@injectable()
export default class AttributesRepositoryImpl implements AttributeRepository {
    private readonly store = new AttributesStore();

    public getAttributes(): Attribute[] {
        return this.store.attributes;
    }

    public setAttributes(attributes: Attribute[]) {
        this.store.setAttributes(attributes);
    }

    // eslint-disable-next-line class-methods-use-this
    private getPossibleValues(): Value {
        const max = randomNumber(3, 99);
        let min = randomNumber(2, max);

        while (min !== max) {
            min = randomNumber(2, max);
        }

        return {
            from: min,
            to: max,
        };
    }

    // eslint-disable-next-line class-methods-use-this
    private getNormalValues(possibleValues: Value): Value {
        const { from, to } = possibleValues;
        const max = randomNumber(from, to);
        const min = randomNumber(from, max);

        return {
            from: min,
            to: max,
        };
    }

    public generateAttributes(attributesAmount: number): Attribute[] {
        const attributes: Attribute[] = [];

        for (let i = 1; i <= attributesAmount; i++) {
            const attributeName = `${ATTRIBUTE_NAME}${i}`;
            const possibleValues = this.getPossibleValues();
            const normalValues = this.getNormalValues(possibleValues);
            const attribute = new Attribute(v4(), attributeName, possibleValues, normalValues);

            attributes.push(attribute);
        }

        return attributes;
    }
}
