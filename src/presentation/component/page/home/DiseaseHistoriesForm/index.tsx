import React, { FC } from 'react';
import { Form as FormikForm, Formik } from 'formik';
import Button from '@material-ui/core/Button';
import DiseaseHistoriesFormData from 'domain/entity/diseaseHistory/DiseaseHistoriesFormData';
import { useService } from 'presentation/context/Container';
import AppController from 'presentation/controller/app/AppController';
import TextField from 'presentation/component/common/formik/TextField';
import { Wrapper } from './styles';

const INITIAL_VALUES: DiseaseHistoriesFormData = {
    diseaseHistoriesAmount: '',
};

const DiseaseHistoriesForm: FC = () => {
    const { handleDiseaseHistoriesFormHandle } = useService(AppController);

    return (
        <Formik initialValues={INITIAL_VALUES} onSubmit={handleDiseaseHistoriesFormHandle}>
            <FormikForm>
                <Wrapper>
                    <TextField
                        name="diseaseHistoriesAmount"
                        type="number"
                        label="Число историй болезней"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: 9999 }}
                        required
                    />
                    <Button variant="contained" type="submit" color="primary">
                        Сгенерировать
                    </Button>
                </Wrapper>
            </FormikForm>
        </Formik>
    );
};

export default DiseaseHistoriesForm;
