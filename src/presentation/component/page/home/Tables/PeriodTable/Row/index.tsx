import { FC } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import getStringInterval from 'helper/string/getStringInterval';
import Period from 'domain/entity/period/Period';

type PropsT = {
    period: Period;
};

const Row: FC<PropsT> = (props) => {
    const { period } = props;
    const { disease, attribute, amount, values, bounds } = period;

    return (
        <TableRow>
            <TableCell>{disease.name}</TableCell>
            <TableCell>{attribute.name}</TableCell>
            <TableCell>{amount}</TableCell>
            <TableCell>
                {values.map((_, index) => (
                    <TableRow>{index + 1}</TableRow>
                ))}
            </TableCell>
            <TableCell>
                {values.map((value) => (
                    <TableRow>{getStringInterval(value)}</TableRow>
                ))}
            </TableCell>
            <TableCell>
                {bounds.map(({ lowerBound }) => (
                    <TableRow>{lowerBound}</TableRow>
                ))}
            </TableCell>
            <TableCell>
                {bounds.map(({ upperBound }) => (
                    <TableRow>{upperBound}</TableRow>
                ))}
            </TableCell>
        </TableRow>
    );
};

export default Row;
