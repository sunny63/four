import { injectable } from 'inversify';
import Period from 'domain/entity/period/Period';
import PeriodRepository from 'domain/repository/period/PeriodRepository';
import PeriodStore from 'data/store/PeriodStore';

@injectable()
export default class PeriodsRepositoryImpl implements PeriodRepository {
    private readonly store = new PeriodStore();

    public getPeriods(): Period[] {
        return this.store.periods;
    }

    public setPeriods(periods: Period[]) {
        this.store.setPeriods(periods);
    }
}
