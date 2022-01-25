import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import { useService } from 'presentation/context/Container';
import AppController from 'presentation/controller/app/AppController';
import { Wrapper } from './styles';

const IndKnowledgeGenerationButton: FC = () => {
    const { handleIndKnowledgeGenerationButtonClick } = useService(AppController);

    return (
        <Wrapper>
            <Button
                variant="contained"
                type="submit"
                color="primary"
                onClick={handleIndKnowledgeGenerationButtonClick}
            >
                Сгенерировать
            </Button>
        </Wrapper>
    );
};

export default IndKnowledgeGenerationButton;
