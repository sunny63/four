import {observer} from 'mobx-react';
import {useService} from 'presentation/context/Container';
import Step from 'domain/entity/app/Step';
import AppController from 'presentation/controller/app/AppController';
import Layout from 'presentation/component/layout/Main';
import Form from "./Form";
import Tables from './Tables';

const HomePage = observer(() => {
    const { step } = useService(AppController);

    return (
        <Layout>
            {step === Step.InputData && <Form />}
            {step === Step.ShowTables && <Tables />}
        </Layout>
    );
});

export default HomePage;
