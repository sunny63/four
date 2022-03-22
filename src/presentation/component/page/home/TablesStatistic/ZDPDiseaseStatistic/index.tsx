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
    id: 'disease' | 'CHPD' | 'ZDP' | 'percent1' | 'percent2' | 'percent3' | 'percent4';
    label: string;
}

const COLUMNS: Column[] = [
    { id: 'disease', label: 'Заболевание' },
    { id: 'CHPD', label: 'Номер периода' },
    { id: 'ZDP', label: 'ЗДП ИФБЗ/ЗДП МБЗ' },
    { id: 'percent1', label: 'Процент тождественного совпадения' },
    { id: 'percent2', label: 'Процент ЗДПифбз подмножество ЗДПмбз' },
    { id: 'percent3', label: 'Процент ЗДПмбз подмножество ЗДПифбз' },
    { id: 'percent4', label: 'Процент остальных случаев' },
];

const PeriodTable = observer(() => {
    const { periods, indPeriods } = useService(AppController);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1000);
    const periodsForTable = periods;
    const indPeriodsForTable = indPeriods;
    const periodsStatistic: StatisticPeriod[] = [];

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
        if (i !== 0 && ail === periodsForTable[i - 1].disease) {
            // eslint-disable-next-line no-continue
            continue;
        }
        for (let j = i; j < periodsForTable.length; j++) {
            if (ail === periodsForTable[j].disease) {
                if (periodsForTable[j].amount === indPeriodsForTable[j].amount) {
                    countTrue++;
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
        for (let s = i; s < periodsForTable.length; s++) {
            if (ail === periodsForTable[s].disease) {
                periodsStatistic[s].pDisease = percent;
            } else {
                break;
            }
        }
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
                        {periodsStatistic
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
