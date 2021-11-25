import { makeAutoObservable } from 'mobx';
import DiseaseHistory from 'domain/entity/diseaseHistory/DiseaseHistory';

export default class DiseaseHistoryStore {
    public diseaseHistories: DiseaseHistory[] = [];

    public amount = 0;

    constructor() {
        makeAutoObservable(this, undefined, {
            autoBind: true,
        });
    }

    public setDiseaseHistories(diseaseHistories: DiseaseHistory[]) {
        this.diseaseHistories = diseaseHistories;
    }

    public setAmount(amount: number) {
        this.amount = amount;
    }
}
