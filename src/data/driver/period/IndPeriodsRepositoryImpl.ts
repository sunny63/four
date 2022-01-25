import { injectable } from 'inversify';
import Period from 'domain/entity/period/Period';
import IndPeriodRepository from 'domain/repository/period/IndPeriodRepository';
import PeriodStore from 'data/store/PeriodStore';

@injectable()
export default class IndPeriodsRepositoryImpl implements IndPeriodRepository {
    private readonly store = new PeriodStore();

    public getPeriods(): Period[] {
        return this.store.indPeriods;
    }

    public setPeriods(periods: Period[]) {
        this.store.setIndPeriods(periods);
    }
}
