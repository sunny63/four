import { makeAutoObservable } from 'mobx';
import Disease from 'domain/entity/disease/Disease';

export default class DiseaseStore {
    public diseases: Disease[] = [];

    constructor() {
        makeAutoObservable(this, undefined, {
            autoBind: true,
        });
    }

    public setDiseases(diseases: Disease[]): void {
        this.diseases = diseases;
    }
}
