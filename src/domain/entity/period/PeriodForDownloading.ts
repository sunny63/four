export default interface PeriodForDownloading {
    disease: string;
    attribute: string;
    amountOfPeriods: number;
    period: number;
    value: string;
    lowerBound: number;
    upperBound: number;
}
