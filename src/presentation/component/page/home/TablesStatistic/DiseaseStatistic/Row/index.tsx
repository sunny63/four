import { FC } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import StatisticPeriod from '../../../../../../../domain/entity/period/StatisticPeriod';

type PropsT = {
    period: StatisticPeriod;
};

const Row: FC<PropsT> = (props) => {
    const { period } = props;
    const { disease, pDisease } = period;

    return (
        <TableRow>
            <TableCell>{disease.name}</TableCell>
            <TableCell>{pDisease}</TableCell>
        </TableRow>
    );
};

export default Row;
