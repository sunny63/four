import React, { FC } from 'react';
import Layout from 'presentation/component/layout/Main';
import Form from './Form';

const HomePage: FC = () => {
    return (
        <Layout>
            <Form />
        </Layout>
    );
};

export default HomePage;
