import Period from 'domain/entity/period/Period';

export default abstract class IndPeriodRepository {
    public abstract getPeriods(): Period[];

    public abstract setPeriods(periods: Period[]): void;
}
