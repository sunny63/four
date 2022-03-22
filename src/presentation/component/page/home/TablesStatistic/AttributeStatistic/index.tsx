import { ChangeEvent, useState } from 'react';
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
import Disease from '../../../../../../domain/entity/disease/Disease';
import Attribute from '../../../../../../domain/entity/attribute/Attribute';

interface Column {
    id: 'attribute' | 'CHPD' | 'percent';
    label: string;
}

const COLUMNS: Column[] = [
    { id: 'attribute', label: 'Признак' },
    { id: 'CHPD', label: 'ЧПД МБД / ЧПД ИФБЗ' },
    { id: 'percent', label: 'Процент совпадения ЧПД' },
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
        const { attribute } = periodsForTable[i];
        let countP = 0;
        let countTrue = 0;
        if (i !== 0 && attribute === periodsForTable[0].attribute) {
            // eslint-disable-next-line no-continue
            break;
        }
        for (let j = i; j < periodsForTable.length; j++) {
            if (attribute === periodsForTable[j].attribute) {
                if (periodsForTable[j].amount === indPeriodsForTable[j].amount) {
                    countTrue++;
                }
                countP++;
            }

            if (j === periodsForTable.length - 1) {
                break;
            }
        }
        const percent = countTrue / countP;
        for (let s = i; s < periodsForTable.length; s++) {
            if (attribute === periodsForTable[s].attribute) {
                periodsStatistic[s].pAttribute = percent;
            }
        }
    }

    let p = 0;
    let count = 0;
    for (let y = 0; y < periodsForTable.length - 1; y++) {
        if (y !== 0 && periodsForTable[y].attribute === periodsForTable[0].attribute) {
            // eslint-disable-next-line no-continue
            break;
        }
        p += periodsStatistic[y].pAttribute;
        count++;
    }
    p /= count;
    const d = new Disease('', '');
    const a = new Attribute(
        '',
        'Общий процент совпадений ЧПД',
        { from: 0, to: 0 },
        { from: 0, to: 0 },
    );

    const stat = new StatisticPeriod('0', d, a, null, null, [], [], 'secondary', 0, p);
    periodsStatistic.unshift(stat);

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
