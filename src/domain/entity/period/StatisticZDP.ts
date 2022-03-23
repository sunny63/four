import Disease from 'domain/entity/disease/Disease';
import Attribute from 'domain/entity/attribute/Attribute';
import ValueWithColor from 'domain/entity/attribute/ValueWithColor';

export default class StatisticZDP {
    constructor(
        public readonly id: string,
        public readonly disease: Disease,
        public readonly attribute: Attribute,
        public readonly valuesMBZWithColor: ValueWithColor[] = [],
        public readonly valuesIFBZWithColor: ValueWithColor[] = [],
        public color: string = '',
        public p1: number | null = null,
        public p2: number | null = null,
        public p3: number | null = null,
        public p4: number | null = null,
    ) {}
}
