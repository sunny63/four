import { injectable, inject } from 'inversify';
import DiseaseRepository from 'domain/repository/disease/DiseaseRepository';

@injectable()
export default class GenerateDiseasesUseCase {
    @inject(DiseaseRepository)
    private readonly diseaseRepository!: DiseaseRepository;

    public execute(diseasesAmount: number): void {
        const diseases = this.diseaseRepository.generateDiseases(diseasesAmount);

        this.diseaseRepository.setDiseases(diseases);
    }
}
