import styled from '@emotion/styled';
import BaseBox from '@material-ui/core/Box';

export const NavBox = styled(BaseBox)`
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: center;
`;

export const TabsWrapper = styled.div();

export const ButtonsContainer = styled.div`
    justify-self: end;
`;
