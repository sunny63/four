import Disease from 'domain/entity/disease/Disease';

export default abstract class DiseaseRepository {
    public abstract getDiseases(): Disease[];

    public abstract setDiseases(diseases: Disease[]): void;
}
