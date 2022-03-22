import { FC } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Period from 'domain/entity/period/Period';

type PropsT = {
    period: Period;
};

const Row: FC<PropsT> = (props) => {
    const { period } = props;
    const { disease, attribute, amount } = period;

    return (
        <TableRow>
            <TableCell>{disease.name}</TableCell>
            <TableCell>{attribute.name}</TableCell>
            <TableCell>{amount}</TableCell>
        </TableRow>
    );
};

export default Row;
