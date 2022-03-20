import { useState, ChangeEvent, useEffect } from 'react';
import { observer } from 'mobx-react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import DiseaseHistory from 'domain/entity/diseaseHistory/DiseaseHistory';
import { useService } from 'presentation/context/Container';
import AppController from 'presentation/controller/app/AppController';
import Loader from 'presentation/component/common/block/Loader';
import Row from './Row';
import { Wrapper } from './styles';

interface Column {
    id: 'numberOfHistory' | 'disease' | 'attribute' | 'momentDuration' | 'momentValue';
    label: string;
}

const COLUMNS: Column[] = [
    { id: 'numberOfHistory', label: 'Номер истории болезни' },
    { id: 'disease', label: 'Класс' },
    { id: 'attribute', label: 'Признак' },
    { id: 'momentDuration', label: 'Момент наблюдения' },
    { id: 'momentValue', label: 'Значение признака' },
];

const DiseaseHistoriesTable = observer(() => {
    const {
        diseaseHistoriesAmount,
        // setSampleGenerationStep,
        periods,
        setDiseaseHistories,
        hasHistories,
        diseaseHistories,
    } = useService(AppController);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1000);
    const [isLoading, setIsLoading] = useState(true);
    const chunksAmount = Math.ceil(diseaseHistoriesAmount / 1000);
    const histories: DiseaseHistory[] = [];

    useEffect(() => {
        if (!hasHistories) {
            const worker = new Worker(new URL('./worker.ts', import.meta.url));

            for (let i = 0; i < chunksAmount; i++) {
                const historiesAmount =
                    i === chunksAmount - 1 ? diseaseHistoriesAmount - i * 1000 : 1000;

                worker.postMessage({
                    periods: [...periods],
                    amount: historiesAmount,
                });

                worker.onmessage = ({ data: { answer } }) => {
                    histories.push(...answer);

                    if (histories.length === periods.length * diseaseHistoriesAmount) {
                        setDiseaseHistories(histories);
                        setIsLoading(false);
                    }
                };
            }
        } else {
            setIsLoading(false);
        }
    }, [diseaseHistoriesAmount]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Wrapper>
            {isLoading && <Loader />}
            {!isLoading && (
                <>
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
                                            <Row
                                                key={diseaseHistory.id}
                                                diseaseHistory={diseaseHistory}
                                            />
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
                </>
            )}
        </Wrapper>
    );
});

export default DiseaseHistoriesTable;
