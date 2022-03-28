import { FC } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import StatisticPeriod from '../../../../../../../domain/entity/period/StatisticPeriod';

type PropsT = {
    period: StatisticPeriod;
};

const Row: FC<PropsT> = (props) => {
    const { period } = props;
    const { disease, pDisease, p1, p2 } = period;

    return (
        <TableRow>
            <TableCell>{disease.name}</TableCell>
            <TableCell>{pDisease}</TableCell>
            <TableCell>{p1}%</TableCell>
            <TableCell>{p2}%</TableCell>
        </TableRow>
    );
};

export default Row;
