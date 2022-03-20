import React, { FC } from 'react';
import { Form as FormikForm, Formik } from 'formik';
import Button from '@material-ui/core/Button';
import FormData from 'domain/entity/app/FormData';
import { useService } from 'presentation/context/Container';
import AppController from 'presentation/controller/app/AppController';
import TextField from 'presentation/component/common/formik/TextField';
import { Wrapper } from './styles';

const INITIAL_VALUES: FormData = {
    diseasesAmount: '',
    attributesAmount: '',
    periodsAmount: '',
};

const Form: FC = () => {
    const { handleFormSubmit } = useService(AppController);

    return (
        <Formik initialValues={INITIAL_VALUES} onSubmit={handleFormSubmit}>
            <FormikForm>
                <Wrapper>
                    <TextField
                        name="diseasesAmount"
                        type="number"
                        color="secondary"
                        label="Введите количество классов"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: 99 }}
                        required
                    />
                    <TextField
                        name="attributesAmount"
                        type="number"
                        color="secondary"
                        label="Введите количество признаков"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: 999 }}
                        required
                    />
                    <TextField
                        name="periodsAmount"
                        type="number"
                        color="secondary"
                        label="Введите максимальное количество периодов динамики"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: 5 }}
                        required
                    />
                    <Button variant="contained" type="submit" color="secondary">
                        Сгенерировать базу знаний
                    </Button>
                </Wrapper>
            </FormikForm>
        </Formik>
    );
};

export default Form;
