import { useState } from 'react';
import { observer } from 'mobx-react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { useService } from 'presentation/context/Container';
import Step from 'domain/entity/app/Step';
import AppController from 'presentation/controller/app/AppController';
import Layout from 'presentation/component/layout/Main';
import DiseaseHistoriesForm from './DiseaseHistoriesForm';
import Form from './Form';
import Tables from './Tables';
import DiseaseHistoriesTable from './DiseaseHistoriesTable';

const HomePage = observer(() => {
    const {
        step,
        setInputDataStep,
        setSampleGenerationStep,
        setShowTablesStep,
        setShowDiseaseHistoriesStep,
        periods,
        diseaseHistories,
    } = useService(AppController);
    const [value, setValue] = useState<number>(0);
    const hasPeriods = periods.length > 0;

    const handleChange = (newValue: number) => {
        setValue(newValue);

        if (newValue) {
            if (diseaseHistories.length > 0) {
                setShowDiseaseHistoriesStep();
            } else {
                setSampleGenerationStep();
            }
        } else if (hasPeriods) {
            setShowTablesStep();
        } else {
            setInputDataStep();
        }
    };

    return (
        <Layout>
            <Tabs
                value={value}
                onChange={(_, selectedValue) => handleChange(selectedValue)}
                textColor="primary"
                indicatorColor="primary"
            >
                <Tab label="Генерация базы знаний" />
                <Tab label="Генерация выборки" disabled={!hasPeriods} />
            </Tabs>
            {step === Step.InputData && <Form />}
            {step === Step.SampleGeneration && <DiseaseHistoriesForm />}
            {step === Step.ShowTables && <Tables />}
            {step === Step.ShowDiseaseHistories && <DiseaseHistoriesTable />}
        </Layout>
    );
});

export default HomePage;
