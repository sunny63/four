import Disease from 'domain/entity/disease/Disease';

export default abstract class IndDiseaseRepository {
    public abstract getDiseases(): Disease[];

    public abstract setDiseases(diseases: Disease[]): void;
}
