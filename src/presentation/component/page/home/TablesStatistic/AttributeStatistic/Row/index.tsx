import { FC } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import StatisticPeriod from '../../../../../../../domain/entity/period/StatisticPeriod';

type PropsT = {
    period: StatisticPeriod;
};

const Row: FC<PropsT> = (props) => {
    const { period } = props;
    const { attribute, amountMBZ, amountIFBZ, pAttribute } = period;

    return (
        <TableRow>
            <TableCell>{attribute.name}</TableCell>
            <TableCell>
                {amountMBZ} / {amountIFBZ}
            </TableCell>
            <TableCell>{pAttribute}</TableCell>
        </TableRow>
    );
};

export default Row;
