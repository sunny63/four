import Disease from 'domain/entity/disease/Disease';
import Attribute from 'domain/entity/attribute/Attribute';
import Bound from 'domain/entity/period/Bound';
import Value from 'domain/entity/attribute/Value';

export default class Period {
    constructor(
        public readonly id: string,
        public readonly disease: Disease,
        public readonly attribute: Attribute,
        public readonly amount: number,
        public readonly values: Value[] = [],
        public readonly bounds: Bound[] = [],
    ) {}
}
