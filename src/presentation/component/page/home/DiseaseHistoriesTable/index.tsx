import { useState, ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { useService } from 'presentation/context/Container';
import AppController from 'presentation/controller/app/AppController';
import Row from './Row';
import { Wrapper, Button } from './styles';

interface Column {
    id:
        | 'disease'
        | 'attribute'
        | 'amount'
        | 'numberOfPeriod'
        | 'periodDuration'
        | 'momentsAmount'
        | 'numberOfMoment'
        | 'momentDuration'
        | 'momentValue';
    label: string;
}

const COLUMNS: Column[] = [
    { id: 'disease', label: 'Класс' },
    { id: 'attribute', label: 'Признак' },
    { id: 'amount', label: 'ЧПД' },
    { id: 'numberOfPeriod', label: 'Номер пер.' },
    { id: 'periodDuration', label: 'Длительность периода' },
    { id: 'momentsAmount', label: 'Число моментов наблюдения' },
    { id: 'numberOfMoment', label: 'Номер момента' },
    { id: 'momentDuration', label: 'Длительность момента' },
    { id: 'momentValue', label: 'Значение признака' },
];

const DiseaseHistoriesTable = observer(() => {
    const { diseaseHistories, setSampleGenerationStep } = useService(AppController);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Wrapper>
            <Button type="button" color="primary" onClick={setSampleGenerationStep}>
                Генерация
            </Button>
            <Paper>
                <TableContainer component={Paper}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {COLUMNS.map(({ id, label }) => (
                                    <TableCell key={id}>{label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {diseaseHistories
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((diseaseHistory) => (
                                    <Row key={diseaseHistory.id} diseaseHistory={diseaseHistory} />
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={diseaseHistories.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Wrapper>
    );
});

export default DiseaseHistoriesTable;
