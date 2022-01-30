import { FC, useState } from 'react';
import { observer } from 'mobx-react';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
import Step from 'domain/entity/app/Step';
import { useService } from 'presentation/context/Container';
import AppController from 'presentation/controller/app/AppController';
import PeriodTable from './PeriodTable';
import DiseasesTable from './DiseasesTable';
import AttributesTable from './AttributesTable';
import ValuesTable from './ValuesTable';
import CHPDTable from './CHPDTable';
import { NavBox, TabsWrapper, ButtonsContainer } from './styles';

const Tables: FC = observer(() => {
    const { setInputDataStep, step, setIndKnowledgeBaseGenerationStep } = useService(AppController);
    const [value, setValue] = useState<number>(4);
    const buttonText = step === Step.IndKnowledgeBase ? 'Сформировать' : 'Генерация';
    const generationButtonOnClick =
        step === Step.IndKnowledgeBase ? setIndKnowledgeBaseGenerationStep : setInputDataStep;

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
                                <Tab label="Классы" />
                                <Tab label="Признаки" />
                                <Tab label="Возможные/Нормальные значения" />
                                <Tab label="ЧПД" />
                                <Tab label="ЗДП" />
                            </Tabs>
                        </>
                    )}
                </TabsWrapper>
                <ButtonsContainer>
                    <Button type="button" color="primary" onClick={generationButtonOnClick}>
                        {buttonText}
                    </Button>
                </ButtonsContainer>
            </NavBox>
            {value === 0 && <DiseasesTable />}
            {value === 1 && <AttributesTable />}
            {value === 2 && <ValuesTable />}
            {value === 3 && <CHPDTable />}
            {value === 4 && <PeriodTable />}
        </Box>
    );
});

export default Tables;
