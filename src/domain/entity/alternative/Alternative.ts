import Value from 'domain/entity/attribute/Value';
import Bound from 'domain/entity/period/Bound';

export default class Alternative {
    constructor(
        public readonly periodsAmount: number,
        public readonly values: Value[],
        public readonly bounds: Bound[],
    ) {}
}
