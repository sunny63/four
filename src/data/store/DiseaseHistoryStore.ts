import { makeAutoObservable } from 'mobx';
import DiseaseHistory from 'domain/entity/diseaseHistory/DiseaseHistory';

export default class DiseaseHistoryStore {
    public diseaseHistories: DiseaseHistory[] = [];

    constructor() {
        makeAutoObservable(this, undefined, {
            autoBind: true,
        });
    }

    public setDiseaseHistories(diseaseHistories: DiseaseHistory[]) {
        this.diseaseHistories = diseaseHistories;
    }
}
