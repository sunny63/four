import { injectable, inject } from 'inversify';
import { v4 } from 'uuid';
import Disease from 'domain/entity/disease/Disease';
import DiseaseRepository from 'domain/repository/disease/DiseaseRepository';

const DISEASE_NAME = 'Заболевание';

@injectable()
export default class GenerateDiseasesUseCase {
    @inject(DiseaseRepository)
    private readonly diseaseRepository!: DiseaseRepository;

    public execute(diseasesAmount: number): void {
        const diseases: Disease[] = [];

        for (let i = 1; i <= diseasesAmount; i++) {
            const diseaseName = `${DISEASE_NAME}${i}`;
            const disease = new Disease(v4(), diseaseName);

            diseases.push(disease);
        }

        this.diseaseRepository.setDiseases(diseases);
    }
}
