import { FC, HTMLAttributes } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Wrapper } from './styles';

type PropsT = HTMLAttributes<HTMLDivElement> & {
    size?: number | string;
};

const Loader: FC<PropsT> = (props) => {
    const { size, ...restProps } = props;

    return (
        <Wrapper {...restProps}>
            <CircularProgress thickness={1.5} size={size} color="primary" />
        </Wrapper>
    );
};

export default Loader;
