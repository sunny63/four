import Attribute from 'domain/entity/attribute/Attribute';

export default abstract class IndAttributeRepository {
    public abstract getAttributes(): Attribute[];

    public abstract setAttributes(attributes: Attribute[]): void;

    public abstract setAttributeValue(attributeId: Attribute['id'], value: number): void;

    public abstract getAttributeValues(attributeId: Attribute['id']): number[];
}
