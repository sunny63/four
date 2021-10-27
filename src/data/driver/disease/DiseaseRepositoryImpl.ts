import { injectable } from 'inversify';
import { v4 } from 'uuid';
import Disease from 'domain/entity/disease/Disease';
import DiseaseRepository from 'domain/repository/disease/DiseaseRepository';
import DiseaseStore from 'data/store/DiseaseStore';

const DISEASE_NAME = 'Заболевание';

@injectable()
export default class DiseaseRepositoryImpl implements DiseaseRepository {
    private readonly store = new DiseaseStore();

    public getDiseases(): Disease[] {
        return this.store.diseases;
    }

    public setDiseases(diseases: Disease[]) {
        this.store.setDiseases(diseases);
    }

    // eslint-disable-next-line class-methods-use-this
    public generateDiseases(diseasesAmount: number): Disease[] {
        const diseases: Disease[] = [];

        for (let i = 1; i <= diseasesAmount; i++) {
            const diseaseName = `${DISEASE_NAME}${i}`
            const disease = new Disease(v4(), diseaseName);

            diseases.push(disease);
        }

        return diseases;
    }
}
