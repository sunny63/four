import { FC, useState } from 'react';
import { observer } from 'mobx-react';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Step from 'domain/entity/app/Step';
import { useService } from 'presentation/context/Container';
import AppController from 'presentation/controller/app/AppController';
import DiseaseStatistic from './DiseaseStatistic';
import AttributeStatistic from './AttributeStatistic';
import ZDPDiseaseStatistic from './ZDPDiseaseStatistic';
import ZDPAttributeStatistic from './ZDPAttributeStatistic';
import { NavBox, TabsWrapper } from './styles';

const TablesStatistic: FC = observer(() => {
    const { step } = useService(AppController);
    const [value, setValue] = useState<number>(0);

    const handleChange = (newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box>
            <NavBox sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabsWrapper>
                    {step !== Step.IndKnowledgeBase && (
                        <>
                            <Tabs
                                value={value}
                                onChange={(_, selectedValue) => handleChange(selectedValue)}
                                textColor="primary"
                                indicatorColor="primary"
                            >
                                <Tab label="По заболеваниям" />
                                <Tab label="По признакам" />
                                <Tab label="ЗДП по заболеваниям" />
                                <Tab label="ЗДП по признакам" />
                            </Tabs>
                        </>
                    )}
                </TabsWrapper>
            </NavBox>
            {value === 0 && <DiseaseStatistic />}
            {value === 1 && <AttributeStatistic />}
            {value === 2 && <ZDPDiseaseStatistic />}
            {value === 3 && <ZDPAttributeStatistic />}
        </Box>
    );
});

export default TablesStatistic;
