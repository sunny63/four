import { injectable } from 'inversify';
import Disease from 'domain/entity/disease/Disease';
import IndDiseaseRepository from 'domain/repository/disease/IndDiseaseRepository';
import DiseaseStore from 'data/store/DiseaseStore';

@injectable()
export default class IndDiseaseRepositoryImpl implements IndDiseaseRepository {
    private readonly store = new DiseaseStore();

    public getDiseases(): Disease[] {
        return this.store.indDiseases;
    }

    public setDiseases(diseases: Disease[]) {
        this.store.setIndDiseases(diseases);
    }
}
