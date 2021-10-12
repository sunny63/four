import React, { ChangeEvent, ChangeEventHandler, FC, useState } from 'react';
import { Form as FormikForm, Formik, FormikValues } from 'formik';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextField from 'presentation/component/common/formik/TextField';
import { Wrapper } from './styles';

const Form: FC = () => {
    const [possibleValues, setPossibleValues] = useState<number>(99);
    const [upperBound, setUpperBound] = useState<number>(12);

    const handlePossibleValuesChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;

        setPossibleValues(Number.parseInt(value, 10));
    }

    const handleUpperBoundChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;

        setUpperBound(Number.parseInt(value, 10));
    }

    const handleSubmit = (values: FormikValues) => {
        console.log('submit');
        console.log({values});
    }

    return (
        <Formik initialValues={{}} onSubmit={handleSubmit} >
            <FormikForm>
                <Wrapper>
                    <TextField
                        name="numberOfClasses"
                        type="number"
                        label="Число классов"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: 99, }}
                        required
                    />
                    <TextField
                        name="numberOfFeatures"
                        type="number"
                        label="Число Признаков"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: 999, }}
                        required
                    />
                    <TextField
                        name="possibleValues"
                        type="number"
                        label="Возможные значения"
                        variant="outlined"
                        onChange={handlePossibleValuesChange}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 2, max: 99, }}
                        required
                    />
                    <TextField
                        name="normalValues"
                        type="number"
                        label="Нормальные значения"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: possibleValues - 1, }}
                        required
                    />
                    <TextField
                        name="numberOfPeriods"
                        type="number"
                        label="Число периодов динамики"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: 5, }}
                        required
                    />
                    <TextField
                        name="valuesForPeriods"
                        type="number"
                        label="Значения для периодов"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: possibleValues - 1, }}
                        required
                    />
                    <TextField
                        name="upperBound"
                        type="number"
                        label="Верхняя граница периодов"
                        variant="outlined"
                        onChange={handleUpperBoundChange}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 2, max: 12, }}
                        required
                    />
                    <TextField
                        name="lowerBound"
                        type="number"
                        label="Нижняя граница периодов"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: upperBound - 1, }}
                        required
                    />
                    <Button variant="contained" type="submit" >Сгенерировать</Button>
                </Wrapper>
            </FormikForm>
        </Formik>
    );
};

export default Form;