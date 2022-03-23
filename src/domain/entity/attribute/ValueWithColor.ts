import Value from 'domain/entity/attribute/Value';

export default class ValueWithColor {
    constructor(public readonly value: Value, public color: string = '') {}
}
