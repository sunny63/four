import React, { FC } from 'react';
import TextField from '@material-ui/core/TextField';
import Layout from 'presentation/component/layout/Main';
import { Wrapper } from './styles';

const HomePage: FC = () => {
    return (
        <Layout>
            <Wrapper>
                    <TextField
                        type="number"
                        label="Число классов"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: 99, }}
                    />
                    <TextField
                        type="number"
                        label="Число Признаков"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: 999, }}
                    />
                    <TextField
                        type="number"
                        label="Возможные значения"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 2, max: 99, }}
                    />
                    <TextField
                        type="number"
                        label="Нормальные значения"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: 98, }}
                    />
                    <TextField
                        type="number"
                        label="Число периодов динамики"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: 5, }}
                    />
                    <TextField
                        type="number"
                        label="Значения для периодов"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: 98, }}
                    />
                    <TextField
                        type="number"
                        label="Верхняя граница периодов"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 2, max: 12, }}
                    />
                    <TextField
                        type="number"
                        label="Нижняя граница периодов"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: 11, }}
                    />
            </Wrapper>
        </Layout>
    );
};

export default HomePage;
