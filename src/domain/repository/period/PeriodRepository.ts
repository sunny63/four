import Period from 'domain/entity/period/Period';

export default abstract class PeriodRepository {
    public abstract getPeriods(): Period[];

    public abstract setPeriods(periods: Period[]): void;
}
