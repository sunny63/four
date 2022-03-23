import { FC } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import StatisticZDP from '../../../../../../../domain/entity/period/StatisticZDP';
import getStringInterval from '../../../../../../../helper/string/getStringInterval';

type PropsT = {
    period: StatisticZDP;
};

const Row: FC<PropsT> = (props) => {
    const { period } = props;
    const { disease, attribute, valuesMBZWithColor, valuesIFBZWithColor, p1, p2, p3, p4 } = period;

    return (
        <TableRow>
            <TableCell>{disease.name}</TableCell>
            <TableCell>{attribute.name}</TableCell>
            <TableCell>
                {valuesIFBZWithColor.map((_, index) => (
                    <TableRow>{index + 1}</TableRow>
                ))}
            </TableCell>
            <TableCell>
                {valuesMBZWithColor.map((value) => (
                    <TableRow style={{ backgroundColor: value.color }}>
                        {getStringInterval(value.value)}
                    </TableRow>
                ))}
            </TableCell>
            <TableCell>
                {valuesIFBZWithColor.map((value) => (
                    <TableRow style={{ backgroundColor: value.color }}>
                        {getStringInterval(value.value)}
                    </TableRow>
                ))}
            </TableCell>
            <TableCell>{p1}</TableCell>
            <TableCell>{p2}</TableCell>
            <TableCell>{p3}</TableCell>
            <TableCell>{p4}</TableCell>
        </TableRow>
    );
};

export default Row;
