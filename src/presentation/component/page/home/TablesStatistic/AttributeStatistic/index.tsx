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
    id: 'attribute' | 'CHPD' | 'percent' | 'percent1' | 'percent2';
    label: string;
}

const COLUMNS: Column[] = [
    { id: 'attribute', label: 'Признак' },
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
    const periodsStatisticFromAttribute: StatisticPeriod[] = [];

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
        let p1 = 0;
        let p2 = 0;
        if (i !== 0 && attribute === periodsForTable[0].attribute) {
            // eslint-disable-next-line no-continue
            break;
        }
        for (let j = i; j < periodsForTable.length; j++) {
            if (attribute === periodsForTable[j].attribute) {
                if (periodsForTable[j].amount === indPeriodsForTable[j].amount) {
                    countTrue++;
                } else if (periodsForTable[j].amount > indPeriodsForTable[j].amount) {
                    p1++;
                } else if (periodsForTable[j].amount < indPeriodsForTable[j].amount) {
                    p2++;
                }

                countP++;
            }

            if (j === periodsForTable.length - 1) {
                break;
            }
        }
        const percent = countTrue / countP;
        const percent1 = p1 / countP;
        const percent2 = p2 / countP;
        for (let s = i; s < periodsForTable.length; s++) {
            if (attribute === periodsForTable[s].attribute) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                periodsStatistic[s].pAttribute = percent * 100;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                periodsStatistic[s].p1 = percent1 * 100;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                periodsStatistic[s].p2 = percent2 * 100;
            }
        }
    }

    let p = 0;
    let p1All = 0;
    let p2All = 0;
    let count = 0;
    for (let y = 0; y < periodsForTable.length - 1; y++) {
        if (y !== 0 && periodsForTable[y].attribute === periodsForTable[0].attribute) {
            // eslint-disable-next-line no-continue
            break;
        }
        p += periodsStatistic[y].pAttribute;
        p1All += periodsStatistic[y].p1;
        p2All += periodsStatistic[y].p2;
        count++;
    }
    p /= count;
    p1All /= count;
    p2All /= count;
    const d = new Disease('', '');
    const a = new Attribute(
        '',
        'Статистика по всем парам ЧПДмбз / ЧПДифбз',
        { from: 0, to: 0 },
        { from: 0, to: 0 },
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    p = p.toFixed(2);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    p1All = p1All.toFixed(2);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    p2All = p2All.toFixed(2);

    const stat = new StatisticPeriod('0', d, a, 2, 2, [], [], 'secondary', 0, p, p1All, p2All);

    for (let q = 0; q < periodsForTable.length - 1; q++) {
        if (q !== 0 && periodsForTable[q].attribute === periodsForTable[0].attribute) {
            // eslint-disable-next-line no-continue
            break;
        }
        periodsStatisticFromAttribute.push(periodsStatistic[q]);
    }

    periodsStatisticFromAttribute.unshift(stat);

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
                        {periodsStatisticFromAttribute
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
