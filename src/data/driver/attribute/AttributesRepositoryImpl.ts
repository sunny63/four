import { injectable } from 'inversify';
import Attribute from 'domain/entity/attribute/Attribute';
import AttributeRepository from 'domain/repository/attribute/AttributeRepository';
import AttributesStore from 'data/store/AttributesStore';

@injectable()
export default class AttributesRepositoryImpl implements AttributeRepository {
    private readonly store = new AttributesStore();

    public getAttributes(): Attribute[] {
        return this.store.attributes;
    }

    public setAttributes(attributes: Attribute[]) {
        this.store.setAttributes(attributes);
    }
}
