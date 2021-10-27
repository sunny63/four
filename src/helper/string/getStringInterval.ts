import Value from 'domain/entity/attribute/Value';

const getStringInterval = (value: Value): string => {
    const { from, to } = value;

    if (from === to) {
        return `${from}`;
    }

    return `[${from}, ${to}]`;
}

export default getStringInterval;
