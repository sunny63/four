import { injectable } from 'inversify';
import Attribute from 'domain/entity/attribute/Attribute';
import IndAttributeRepository from 'domain/repository/attribute/IndAttributeRepository';
import AttributesStore from 'data/store/AttributesStore';

@injectable()
export default class IndAttributesRepositoryImpl implements IndAttributeRepository {
    private readonly store = new AttributesStore();

    public getAttributes(): Attribute[] {
        return this.store.indAttributes;
    }

    public setAttributes(attributes: Attribute[]) {
        this.store.setIndAttributes(attributes);
    }

    public setAttributeValue(attributeId: Attribute['id'], value: number) {
        this.store.setAttributeValue(attributeId, value);
    }

    public getAttributeValues(attributeId: Attribute['id']): number[] {
        return this.store.indAttributeValues[attributeId];
    }
}
