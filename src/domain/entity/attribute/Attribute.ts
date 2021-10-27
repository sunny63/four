import Value from 'domain/entity/attribute/Value';

export default class Attribute {
    constructor(
        public readonly id: string,
        public readonly name: string = '',
        public readonly possibleValues: Value,
        public readonly normalValues: Value,
    ) {}
}
