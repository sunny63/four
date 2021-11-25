import { injectable } from 'inversify';
import DiseaseHistory from 'domain/entity/diseaseHistory/DiseaseHistory';
import DiseaseHistoryRepository from 'domain/repository/diseaseHistory/DiseaseHistoryRepository';
import DiseaseHistoryStore from 'data/store/DiseaseHistoryStore';

@injectable()
export default class DiseaseHistoryRepositoryImpl implements DiseaseHistoryRepository {
    private readonly store = new DiseaseHistoryStore();

    public getDiseasesHistories(): DiseaseHistory[] {
        return this.store.diseaseHistories;
    }

    public setDiseaseHistories(diseaseHistories: DiseaseHistory[]) {
        this.store.setDiseaseHistories(diseaseHistories);
    }

    public getAmount(): number {
        return this.store.amount;
    }

    public setAmount(amount: number) {
        this.store.setAmount(amount);
    }
}
