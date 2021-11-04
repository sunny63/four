import Value from 'domain/entity/attribute/Value';
import randomNumber from 'helper/common/randomNumber';

const getRandomRange = (from: number, to: number): Value => {
    const max = randomNumber(from, to);
    const min = randomNumber(from, max);

    return {
        from: min,
        to: max,
    };
};

export default getRandomRange;
