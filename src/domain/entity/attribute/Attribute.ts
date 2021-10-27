export default class Attribute {
    constructor(
        public readonly id: string,
        public readonly name: string = '',
        public readonly possibleValues: number[] = [],
        public readonly normalValues: number[] = [],
    ) {}
}
