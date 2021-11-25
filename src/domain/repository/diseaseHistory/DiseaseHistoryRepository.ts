import DiseaseHistory from 'domain/entity/diseaseHistory/DiseaseHistory';

export default abstract class DiseaseHistoryRepository {
    public abstract setDiseaseHistories(diseaseHistories: DiseaseHistory[]): void;

    public abstract getDiseasesHistories(): DiseaseHistory[];

    public abstract setAmount(amount: number): void;

    public abstract getAmount(): number;
}
