import Period from 'domain/entity/period/Period';
import MomentOfObservation from 'domain/entity/diseaseHistory/MomentOfObservation';

export default class DiseaseHistory {
    constructor(
        public readonly id: string,
        public readonly period: Period,
        public readonly periodDuration: number[] = [],
        public readonly momentsOfObservation: MomentOfObservation[] = [],
    ) {}
}
