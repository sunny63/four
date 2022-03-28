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
import StatisticPeriod from '../../../../../../domain/entity/period/StatisticPeriod';

interface Column {
    id: 'disease' | 'percent' | 'percent1' | 'percent2';
    label: string;
}

const COLUMNS: Column[] = [
    { id: 'disease', label: 'Заболевание' },
    { id: 'percent', label: 'Процент совпадения ЧПД' },
    { id: 'percent1', label: 'ЧПДмбз > ЧПДифбз' },
    { id: 'percent2', label: 'ЧПДмбз < ЧПДифбз' },
];

const PeriodTable = observer(() => {
    const { periods, indPeriods } = useService(AppController);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1000);
    const periodsForTable = periods;
    const indPeriodsForTable = indPeriods;
    const periodsStatistic: StatisticPeriod[] = [];
    const periodsStatisticFromDisease: StatisticPeriod[] = [];

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let k = 0;
    periodsForTable.forEach((period) => {
        const { amount } = period;
        const amountInd = indPeriodsForTable[k].amount;

        if (amount === amountInd) {
            const p = new StatisticPeriod(
                period.id,
                period.disease,
                period.attribute,
                period.amount,
                amountInd,
                [],
                [],
                'primary',
            );
            periodsStatistic.push(p);
        } else {
            const p = new StatisticPeriod(
                period.id,
                period.disease,
                period.attribute,
                period.amount,
                amountInd,
                [],
                [],
                'secondary',
            );
            periodsStatistic.push(p);
        }
        k++;
    });

    for (let i = 0; i < periodsForTable.length - 1; i++) {
        const ail = periodsForTable[i].disease;
        let countP = 0;
        let countTrue = 0;
        let p1 = 0;
        let p2 = 0;
        if (i !== 0 && ail === periodsForTable[i - 1].disease) {
            // eslint-disable-next-line no-continue
            continue;
        }
        for (let j = i; j < periodsForTable.length; j++) {
            if (ail === periodsForTable[j].disease) {
                if (periodsForTable[j].amount === indPeriodsForTable[j].amount) {
                    countTrue++;
                } else if (periodsForTable[j].amount > indPeriodsForTable[j].amount) {
                    p1++;
                } else if (periodsForTable[j].amount < indPeriodsForTable[j].amount) {
                    p2++;
                }
            } else {
                break;
            }
            countP++;
            if (j === periodsForTable.length - 1) {
                break;
            }
        }
        const percent = countTrue / countP;
        const percent1 = p1 / countP;
        const percent2 = p2 / countP;
        for (let s = i; s < periodsForTable.length; s++) {
            if (ail === periodsForTable[s].disease) {
                periodsStatistic[s].pDisease = percent * 100;
                periodsStatistic[s].p1 = percent1 * 100;
                periodsStatistic[s].p2 = percent2 * 100;
            } else {
                break;
            }
        }
    }

    for (let q = 0; q < periodsForTable.length - 1; q++) {
        if (q !== 0 && periodsForTable[q].disease === periodsForTable[q - 1].disease) {
            // eslint-disable-next-line no-continue
            continue;
        }
        periodsStatisticFromDisease.push(periodsStatistic[q]);
    }

    return (
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
                        {periodsStatisticFromDisease
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((period) => (
                                <Row key={period.id} period={period} />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={periodsForTable.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
});

export default PeriodTable;
