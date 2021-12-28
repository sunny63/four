import { FC } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DiseaseHistory from 'domain/entity/diseaseHistory/DiseaseHistory';

type PropsT = {
    diseaseHistory: DiseaseHistory;
};

const Row: FC<PropsT> = (props) => {
    const { diseaseHistory } = props;
    const { index, period, momentsOfObservation } = diseaseHistory;
    const { disease, attribute } = period;

    return (
        <TableRow>
            <TableCell>{index}</TableCell>
            <TableCell>{disease.name}</TableCell>
            <TableCell>{attribute.name}</TableCell>
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
