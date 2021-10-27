import { makeAutoObservable } from 'mobx';
import Attribute from 'domain/entity/attribute/Attribute';

export default class AttributesStore {
    public attributes: Attribute[] = [];

    constructor() {
        makeAutoObservable(this, undefined, {
            autoBind: true,
        });
    }

    public setAttributes(attributes: Attribute[]): void {
        this.attributes = attributes;
    }
}
