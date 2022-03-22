import Disease from 'domain/entity/disease/Disease';
import Attribute from 'domain/entity/attribute/Attribute';
import Value from 'domain/entity/attribute/Value';

export default class StatisticPeriod {
    constructor(
        public readonly id: string,
        public readonly disease: Disease,
        public readonly attribute: Attribute,
        public readonly amountMBZ: number,
        public readonly amountIFBZ: number,
        public readonly valuesMBZ: Value[] = [],
        public readonly valuesIFBZ: Value[] = [],
        public readonly color: string = '',
        public pDisease: number = 0,
        public pAttribute: number = 0,
    ) {}
}
