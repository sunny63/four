import { makeAutoObservable } from 'mobx';
import Attribute from 'domain/entity/attribute/Attribute';

export default class AttributesStore {
    public attributes: Attribute[] = [];

    public indAttributes: Attribute[] = [];

    public indAttributeValues: Record<Attribute['id'], number[]> = {};

    constructor() {
        makeAutoObservable(this, undefined, {
            autoBind: true,
        });
    }

    public setAttributes(attributes: Attribute[]): void {
        this.attributes = attributes;
    }

    public setIndAttributes(attributes: Attribute[]): void {
        this.indAttributes = attributes;
    }

    public setAttributeValue(attributeId: Attribute['id'], value: number): void {
        if (this.indAttributeValues[attributeId]) {
            this.indAttributeValues[attributeId].push(value);
        } else {
            this.indAttributeValues[attributeId] = [value];
        }
    }
}
