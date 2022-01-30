import Value from 'domain/entity/attribute/Value';
import Bound from 'domain/entity/period/Bound';

export default class Alternative {
    public static CreateEmpty(): Alternative {
        return new Alternative(NaN, [], []);
    }

    constructor(
        public readonly periodsAmount: number,
        public readonly values: Value[],
        public readonly bounds: Bound[],
    ) {}

    public isEmpty(): boolean {
        return Number.isNaN(this.periodsAmount);
    }
}
