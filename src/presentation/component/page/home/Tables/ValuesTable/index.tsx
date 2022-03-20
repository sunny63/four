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
import Step from 'domain/entity/app/Step';
import getStringInterval from 'helper/string/getStringInterval';
import { useService } from 'presentation/context/Container';
import AppController from 'presentation/controller/app/AppController';

interface Column {
    id:
        | 'disease'
        | 'attribute'
        | 'amount'
        | 'numberOfPeriod'
        | 'values'
        | 'lowerBound'
        | 'upperBound'
        | 'possibleValue'
        | 'normalValue';
    label: string;
}

const COLUMNS: Column[] = [
    { id: 'attribute', label: 'Признак' },
    { id: 'possibleValue', label: 'Возможные значения' },
    { id: 'normalValue', label: 'Нормальные значения' },
];

const ValuesTable = observer(() => {
    const { attributes, indAttributes, step } = useService(AppController);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1000);
    const attributesForTable = step === Step.IndKnowledgeBase ? indAttributes : attributes;

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper>
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {COLUMNS.map(({ id, label }) => (
                                <TableCell key={`attributes-${id}`}>{label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attributesForTable
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(({ id, name, possibleValues, normalValues }) => (
                                <TableRow key={id}>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{getStringInterval(possibleValues)}</TableCell>
                                    <TableCell>{getStringInterval(normalValues)}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={attributes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
});

export default ValuesTable;
