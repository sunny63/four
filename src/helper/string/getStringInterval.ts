const getStringInterval = (interval: number[]): string => {
    const intervalLength = interval.length;
    const firsElement = interval[0];
    const lastElement = interval[intervalLength - 1];

    if (intervalLength === 1) {
        return `${firsElement}`;
    }

    return `[${firsElement}, ${lastElement}]`;
}

export default getStringInterval;
