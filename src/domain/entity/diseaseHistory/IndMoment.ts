import Disease from 'domain/entity/disease/Disease';
import Attribute from 'domain/entity/attribute/Attribute';
import DiseaseHistory from 'domain/entity/diseaseHistory/DiseaseHistory';
import MomentOfObservation from 'domain/entity/diseaseHistory/MomentOfObservation';

export default class IndMoment {
    constructor(
        public readonly diseaseName: Disease['name'],
        public readonly attributeName: Attribute['name'],
        public readonly moments: MomentOfObservation[],
        public readonly diseaseHistoryIndex: DiseaseHistory['index'],
    ) {}
}
