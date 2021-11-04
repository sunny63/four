import { injectable } from 'inversify';
import Disease from 'domain/entity/disease/Disease';
import DiseaseRepository from 'domain/repository/disease/DiseaseRepository';
import DiseaseStore from 'data/store/DiseaseStore';

@injectable()
export default class DiseaseRepositoryImpl implements DiseaseRepository {
    private readonly store = new DiseaseStore();

    public getDiseases(): Disease[] {
        return this.store.diseases;
    }

    public setDiseases(diseases: Disease[]) {
        this.store.setDiseases(diseases);
    }
}
