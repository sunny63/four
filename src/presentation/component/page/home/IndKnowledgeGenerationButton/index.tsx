import React, { FC, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import IndMoment from 'domain/entity/diseaseHistory/IndMoment';
import MomentOfObservation from 'domain/entity/diseaseHistory/MomentOfObservation';
import { useService } from 'presentation/context/Container';
import AppController from 'presentation/controller/app/AppController';
import Loader from 'presentation/component/common/block/Loader';
import { Wrapper } from './styles';

const IndKnowledgeGenerationButton: FC = () => {
    const { setIndPeriods, diseaseHistories, setIndKnowledgeBaseStep } = useService(AppController);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const indMoments = diseaseHistories.map(
        ({ period: { disease, attribute }, momentsOfObservation, index }) =>
            new IndMoment(
                disease.name,
                attribute.name,
                momentsOfObservation?.map(
                    ({ duration, value }) => new MomentOfObservation(duration, value),
                ),
                index,
            ),
    );

    useEffect(() => {
        if (isLoading) {
            const worker = new Worker(new URL('./worker.ts', import.meta.url));
            worker.postMessage({
                indMoments: [...indMoments],
            });
            worker.onmessage = ({ data: { answer } }) => {
                setIndPeriods(answer);
                setIsLoading(false);
                setIndKnowledgeBaseStep();
            };
        }
    }, [isLoading]);

    return (
        <Wrapper>
            {isLoading && <Loader />}
            {!isLoading && (
                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    onClick={() => setIsLoading(true)}
                >
                    Сформировать
                </Button>
            )}
        </Wrapper>
    );
};

export default IndKnowledgeGenerationButton;
