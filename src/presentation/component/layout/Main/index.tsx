import React, { FC } from 'react';
import { Global } from '@emotion/react';
import globalCss from 'presentation/component/layout/common/globalCss';
import { Wrapper } from './styles';

const Layout: FC = (props) => {
    const { children } = props;

    return (
        <Wrapper>
            {children}
            <Global styles={globalCss} />
        </Wrapper>
    );
};

export default Layout;
