import { FC } from 'react';
import BaseTextField, { TextFieldProps } from '@material-ui/core/TextField';
import { Field, FieldProps } from 'formik';

type PropsT = TextFieldProps & {
    name: string;
}

const TextField: FC<PropsT> = (props) => {
    const { name, ...restProps } = props;

    return (
        <Field name={name} >
            {({ field }: FieldProps) => (
                <BaseTextField {...restProps} { ...field } />
            )}
        </Field>
    );
};

export default TextField;