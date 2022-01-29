import { FC, useState } from 'react';
import { observer } from 'mobx-react';
// import exportFromJSON, { ExportType } from 'export-from-json';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
// import PeriodForDownloading from 'domain/entity/period/PeriodForDownloading';
// import AttributeForDownloading from 'domain/entity/attribute/AttributeForDownloading';
import Step from 'domain/entity/app/Step';
// import AmountOfPeriods from 'domain/entity/AmountOfPeriods';
import { useService } from 'presentation/context/Container';
import AppController from 'presentation/controller/app/AppController';
import PeriodTable from './PeriodTable';
import DiseasesTable from './DiseasesTable';
import AttributesTable from './AttributesTable';
import ValuesTable from './ValuesTable';
import CHPDTable from './CHPDTable';
import { NavBox, ButtonsContainer } from './styles';

const Tables: FC = observer(() => {
    const {
        // getAttributesForDownloading,
        // getAmountOfPeriodsForDownloading,
        // getPeriodsForDownloading,
        setInputDataStep,
        // periods,
        // attributes,
        step,
        handleIndKnowledgeGenerationButtonClick,
    } = useService(AppController);
    const [value, setValue] = useState<number>(4);
    // const isDisabled = value <= 1;
    const generationButtonOnClick =
        step === Step.IndKnowledgeBase ? handleIndKnowledgeGenerationButtonClick : setInputDataStep;

    const handleChange = (newValue: number) => {
        setValue(newValue);
    };

    // const handleDownloadButtonClick = async (type: ExportType) => {
    //     let data: AmountOfPeriods[] | PeriodForDownloading[] | AttributeForDownloading[] = [];
    //
    //     if (value === 2) {
    //         data = await getAttributesForDownloading(attributes);
    //     }
    //
    //     if (value === 3) {
    //         data = await getAmountOfPeriodsForDownloading(periods);
    //     }
    //
    //     if (value === 4) {
    //         data = await getPeriodsForDownloading(periods);
    //     }
    //
    //     exportFromJSON({
    //         data,
    //         fileName: 'data',
    //         exportType: type,
    //     });
    // };

    return (
        <Box>
            <NavBox sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                <ButtonsContainer>
                    <Button type="button" color="primary" onClick={generationButtonOnClick}>
                        Генерация
                    </Button>
                    {/* <Button */}
                    {/*    type="button" */}
                    {/*    color="primary" */}
                    {/*    disabled={isDisabled} */}
                    {/*    onClick={() => handleDownloadButtonClick('csv')} */}
                    {/* > */}
                    {/*    Скачать CSV */}
                    {/* </Button> */}
                    {/* <Button */}
                    {/*    type="button" */}
                    {/*    color="primary" */}
                    {/*    disabled={isDisabled} */}
                    {/*    onClick={() => handleDownloadButtonClick('xls')} */}
                    {/* > */}
                    {/*    Скачать XLS */}
                    {/* </Button> */}
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
