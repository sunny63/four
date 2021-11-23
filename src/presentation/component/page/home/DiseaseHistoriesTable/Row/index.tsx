import { FC } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DiseaseHistory from 'domain/entity/diseaseHistory/DiseaseHistory';

type PropsT = {
    diseaseHistory: DiseaseHistory;
};

const Row: FC<PropsT> = (props) => {
    const { diseaseHistory } = props;
    const { period, periodDuration, momentsOfObservation } = diseaseHistory;
    const { disease, attribute, amount, values } = period;

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
                {periodDuration.map((_, index) => (
                    <TableRow>{index + 1}</TableRow>
                ))}
            </TableCell>
            <TableCell>
                {momentsOfObservation.map((moment) => (
                    <TableRow>{moment.values.length}</TableRow>
                ))}
            </TableCell>
            <TableCell>
                {momentsOfObservation.map((_, index) => (
                    <TableRow>{index + 1}</TableRow>
                ))}
            </TableCell>
            <TableCell>
                {momentsOfObservation.map(({ duration }) => (
                    <TableRow>
                        {duration.map((dur) => (
                            <TableRow>{dur}</TableRow>
                        ))}
                    </TableRow>
                ))}
            </TableCell>
            <TableCell>
                {momentsOfObservation.map(({ values: momentValues }) => (
                    <TableRow>
                        {momentValues.map((value) => (
                            <TableRow>{value}</TableRow>
                        ))}
                    </TableRow>
                ))}
            </TableCell>
        </TableRow>
    );
};

export default Row;
