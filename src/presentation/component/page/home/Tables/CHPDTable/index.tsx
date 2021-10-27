import { observer } from 'mobx-react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { useService } from 'presentation/context/Container';
import AppController from 'presentation/controller/app/AppController';

interface Column {
    id: 'disease' | 'attribute' | 'amount' |  'numberOfPeriod' | 'values' | 'lowerBound' | 'upperBound',
    label: string,
}

const COLUMNS: Column[] = [
    { id: 'disease', label: 'Класс' },
    { id: 'attribute', label: 'Признак' },
    { id: 'amount', label: 'ЧПД' },
]

const CHPDTable = observer(() => {
    const { periods } = useService(AppController);

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader >
                <TableHead>
                    <TableRow>
                        {COLUMNS.map(({ id, label }) => (
                            <TableCell key={`chpd-${id}`} >{label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {periods.map(({ id, disease, attribute, amount }) => (
                        <TableRow key={`chpd-${id}`}>
                            <TableCell>{disease.name}</TableCell>
                            <TableCell>{attribute.name}</TableCell>
                            <TableCell>{amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default CHPDTable;
