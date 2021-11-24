import { FC } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DiseaseHistory from 'domain/entity/diseaseHistory/DiseaseHistory';

type PropsT = {
    diseaseHistory: DiseaseHistory;
};

const Row: FC<PropsT> = (props) => {
    const { diseaseHistory } = props;
    const { period, periodDuration, momentsOfObservation, periodNumber } = diseaseHistory;
    const { disease, attribute, amount } = period;

    return (
        <TableRow>
            <TableCell>{disease.name}</TableCell>
            <TableCell>{attribute.name}</TableCell>
            <TableCell>{amount}</TableCell>
            <TableCell>
                <TableRow>{periodNumber + 1}</TableRow>
            </TableCell>
            <TableCell>
                <TableRow>{periodDuration}</TableRow>
            </TableCell>
            <TableCell>
                <TableRow>{momentsOfObservation.length}</TableRow>
            </TableCell>
            <TableCell>
                {momentsOfObservation.map((_, index) => (
                    <TableRow>{index + 1}</TableRow>
                ))}
            </TableCell>
            <TableCell>
                {momentsOfObservation.map(({ duration }) => (
                    <TableRow>{duration}</TableRow>
                ))}
            </TableCell>
            <TableCell>
                {momentsOfObservation.map(({ value }) => (
                    <TableRow>{value}</TableRow>
                ))}
            </TableCell>
        </TableRow>
    );
};

export default Row;
