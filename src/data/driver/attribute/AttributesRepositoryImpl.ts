import { injectable } from 'inversify';
import { v4 } from 'uuid';
import Attribute from 'domain/entity/attribute/Attribute';
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
    private getPossibleValues(possibleValues: number): number[] {
        const valuesAmount = randomNumber(2, possibleValues);
        const values: number[] = [];

        for (let i = 0; i < valuesAmount; i++) {
            values.push(i);
        }

        return values;
    }

    // eslint-disable-next-line class-methods-use-this
    private getNormalValues(normalValues: number): number[] {
        const valuesAmount = randomNumber(1, normalValues);
        const values: number[] = [];

        for (let i = 0; i < valuesAmount; i++) {
            values.push(i);
        }

        return values;
    }

    public generateAttributes(attributesAmount: number, possibleValuesAmount: number): Attribute[] {
        const attributes: Attribute[] = [];

        for (let i = 1; i <= attributesAmount; i++) {
            const attributeName = `${ATTRIBUTE_NAME}${i}`;
            const possibleValues = this.getPossibleValues(possibleValuesAmount);
            const normalValues = this.getNormalValues(possibleValues.length - 1);
            const attribute = new Attribute(v4(), attributeName, possibleValues, normalValues);

            attributes.push(attribute);
        }

        return attributes;
    }
}
