import Container from 'framework/Container';
import ContainerFactory from 'framework/ContainerFactory';
import Repository from 'framework/Repository';
import AppRepository from 'domain/repository/app/AppRepository';
import PeriodRepository from 'domain/repository/period/PeriodRepository';
import DiseaseRepository from 'domain/repository/disease/DiseaseRepository';
import AttributeRepository from 'domain/repository/attribute/AttributeRepository';
import DiseaseHistoryRepository from 'domain/repository/diseaseHistory/DiseaseHistoryRepository';
import AppRepositoryImpl from 'data/driver/app/AppRepositoryImpl';
import PeriodsRepositoryImpl from 'data/driver/period/PeriodsRepositoryImpl';
import DiseaseRepositoryImpl from 'data/driver/disease/DiseaseRepositoryImpl';
import AttributesRepositoryImpl from 'data/driver/attribute/AttributesRepositoryImpl';
import DiseaseHistoryRepositoryImpl from 'data/driver/diseaseHistory/DiseaseHistoryRepositoryImpl';

class AppContainer extends Container {
    /**
     * Returns object to be serialized & hydrated
     * */
    // eslint-disable-next-line class-methods-use-this
    protected getData(): Record<string, Repository> {
        return {};
    }

    /**
     * Binds abstract classes to its implementation
     * */
    protected bindAll() {
        this.bind(AppRepository).to(AppRepositoryImpl);
        this.bind(PeriodRepository).to(PeriodsRepositoryImpl);
        this.bind(DiseaseRepository).to(DiseaseRepositoryImpl);
        this.bind(AttributeRepository).to(AttributesRepositoryImpl);
        this.bind(DiseaseHistoryRepository).to(DiseaseHistoryRepositoryImpl);
    }
}

const appContainerFactory = new ContainerFactory(AppContainer);

export default appContainerFactory;
