import { FC, useState } from 'react';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
import { useService } from 'presentation/context/Container';
import AppController from 'presentation/controller/app/AppController';
import PeriodTable from './PeriodTable';
import DiseasesTable from './DiseasesTable';
import AttributesTable from './AttributesTable';
import ValuesTable from './ValuesTable';
import CHPDTable from './CHPDTable';

const Tables: FC = () => {
    const { setInputDataStep } = useService(AppController);
    const [value, setValue] = useState<number>(0);

    const handleChange = (newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={(_, selectedValue) => handleChange(selectedValue)}
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label="ЗДП" />
                    <Tab label="Классы" />
                    <Tab label="Признаки" />
                    <Tab label="Возможные/Нормальные значения" />
                    <Tab label="ЧПД" />
                    <Button type="button" color="primary" onClick={setInputDataStep}>Генрация</Button>
                </Tabs>
            </Box>
            {value === 0 && <PeriodTable />}
            {value === 1 && <DiseasesTable />}
            {value === 2 && <AttributesTable />}
            {value === 3 && <ValuesTable />}
            {value === 4 && <CHPDTable />}
        </Box>
    );
};

export default Tables;