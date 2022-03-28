import { v4 } from 'uuid';
import Attribute from 'domain/entity/attribute/Attribute';
import Value from 'domain/entity/attribute/Value';
import Disease from 'domain/entity/disease/Disease';
import MomentOfObservation from 'domain/entity/diseaseHistory/MomentOfObservation';
import Alternative from 'domain/entity/alternative/Alternative';
import Period from 'domain/entity/period/Period';
import Bound from 'domain/entity/period/Bound';
import IndMoment from 'domain/entity/diseaseHistory/IndMoment';

const checkValues = (value1: Value, value2: Value): boolean => {
    const { from: from1, to: to1 } = value1;
    const { from: from2, to: to2 } = value2;

    if (from1 >= from2 && from1 <= to2) {
        return false;
    }

    if (to1 >= from2 && to1 <= to2) {
        return false;
    }

    if (from2 >= from1 && from2 <= to1) {
        return false;
    }

    if (to2 >= from1 && to2 <= to1) {
        return false;
    }

    return true;
};

const checkFullValues = (values: Value[]): boolean => {
    for (let i = 0; i < values.length - 1; i++) {
        if (!checkValues(values[i], values[i + 1])) {
            return false;
        }
    }

    return true;
};

const mergeAlternatives = (periodsAmount: number, alternatives: Alternative[]): Alternative => {
    const values: Value[] = [];
    const bounds: Bound[] = [];

    for (let i = 0; i < periodsAmount; i++) {
        let fromValue = alternatives[0].values[i].from;
        let toValue = alternatives[0].values[i].to;
        let lowerBoundValue = alternatives[0].bounds[i].lowerBound;
        let upperBoundValue = alternatives[0].bounds[i].upperBound;

        alternatives.forEach((alternative) => {
            const { from, to } = alternative.values[i];
            const { lowerBound, upperBound } = alternative.bounds[i];

            if (fromValue > from) {
                fromValue = from;
            }

            if (toValue < to) {
                toValue = to;
            }

            if (lowerBoundValue > lowerBound) {
                lowerBoundValue = lowerBound;
            }

            if (upperBoundValue < upperBound) {
                upperBoundValue = upperBound;
            }
        });

        const value: Value = {
            from: fromValue,
            to: toValue,
        };
        const bound: Bound = {
            lowerBound: lowerBoundValue,
            upperBound: upperBoundValue,
        };

        values.push(value);
        bounds.push(bound);
    }

    if (checkFullValues(values)) {
        return new Alternative(periodsAmount, values, bounds);
    }

    return Alternative.CreateEmpty();
};

const mergeAlternatives2 = (
    periodsAmount: number,
    alternatives1: Alternative[],
    alternatives2: Alternative[],
): Alternative[] => {
    const alternatives: Alternative[] = [];

    alternatives1.forEach((alternative1) => {
        alternatives2.forEach((alternative2) => {
            const alternative = mergeAlternatives(periodsAmount, [alternative1, alternative2]);

            if (!alternative.isEmpty()) {
                alternatives.push(alternative);
            }
        });
    });

    return alternatives;
};

const getMergedAlternatives = (
    alternatives1: Alternative[],
    alternatives2: Alternative[],
): Alternative[] => {
    const alternatives: Alternative[] = [];

    for (let i = 1; i <= 5; i++) {
        const alts1 = alternatives1.filter(({ periodsAmount }) => periodsAmount === i);
        const alts2 = alternatives2.filter(({ periodsAmount }) => periodsAmount === i);

        if (alts1.length > 0 && alts2.length > 0) {
            const alts = mergeAlternatives2(i, alts1, alts2);

            alternatives.push(...alts);
        }
    }

    return alternatives;
};

const checkFullBounds = (bounds: Bound[]): boolean => {
    const largeBounds = bounds.find(({ upperBound }) => upperBound > 12);

    return !largeBounds;
};

const getValuesForMomentsInPeriod = (moments: MomentOfObservation[]): Value => {
    let minValue = moments[0].value;
    let maxValue = moments[0].value;

    moments.forEach(({ value }) => {
        if (value < minValue) {
            minValue = value;
        }

        if (value > maxValue) {
            maxValue = value;
        }
    });

    return {
        from: minValue,
        to: maxValue,
    };
};

const getAlternativesFor5Periods = (momentsOfObservation: MomentOfObservation[]): Alternative[] => {
    const alternatives: Alternative[] = [];

    for (let i = 1; i < momentsOfObservation.length - 3; i++) {
        for (let j = i + 1; j < momentsOfObservation.length - 2; j++) {
            for (let k = j + 1; k < momentsOfObservation.length - 1; k++) {
                for (let l = k + 1; l < momentsOfObservation.length; l++) {
                    const moments1 = momentsOfObservation.slice(0, i);
                    const moments2 = momentsOfObservation.slice(i, j);
                    const moments3 = momentsOfObservation.slice(j, k);
                    const moments4 = momentsOfObservation.slice(k, l);
                    const moments5 = momentsOfObservation.slice(l, momentsOfObservation.length);
                    const value1 = getValuesForMomentsInPeriod(moments1);
                    const value2 = getValuesForMomentsInPeriod(moments2);
                    const value3 = getValuesForMomentsInPeriod(moments3);
                    const value4 = getValuesForMomentsInPeriod(moments4);
                    const value5 = getValuesForMomentsInPeriod(moments5);
                    const values = [value1, value2, value3, value4, value5];
                    const firstBound = Math.floor(
                        (moments1[moments1.length - 1].duration + moments2[0].duration) / 2,
                    );
                    const secondBound = Math.floor(
                        (moments2[moments2.length - 1].duration + moments3[0].duration) / 2,
                    );
                    const thirdBound = Math.floor(
                        (moments3[moments3.length - 1].duration + moments4[0].duration) / 2,
                    );
                    const fourthBound = Math.floor(
                        (moments4[moments4.length - 1].duration + moments5[0].duration) / 2,
                    );

                    if (checkFullValues(values)) {
                        const bound1: Bound = {
                            lowerBound: moments1[0].duration,
                            upperBound: moments1[moments1.length - 1].duration,
                        };
                        const bound2: Bound = {
                            lowerBound: moments2[0].duration - firstBound,
                            upperBound: moments2[moments2.length - 1].duration - firstBound,
                        };
                        const bound3: Bound = {
                            lowerBound: moments3[0].duration - secondBound,
                            upperBound: moments3[moments3.length - 1].duration - secondBound,
                        };
                        const bound4: Bound = {
                            lowerBound: moments4[0].duration - thirdBound,
                            upperBound: moments4[moments4.length - 1].duration - thirdBound,
                        };
                        const bound5: Bound = {
                            lowerBound: moments5[0].duration - fourthBound,
                            upperBound: moments5[moments5.length - 1].duration - fourthBound,
                        };
                        const bounds: Bound[] = [bound1, bound2, bound3, bound4, bound5];

                        if (checkFullBounds(bounds)) {
                            const alternative = new Alternative(5, values, bounds);

                            alternatives.push(alternative);
                        }
                    }
                }
            }
        }
    }

    return alternatives;
};

const getAlternativesFor4Periods = (momentsOfObservation: MomentOfObservation[]): Alternative[] => {
    const alternatives: Alternative[] = [];

    for (let i = 1; i < momentsOfObservation.length - 2; i++) {
        for (let j = i + 1; j < momentsOfObservation.length - 1; j++) {
            for (let k = j + 1; k < momentsOfObservation.length; k++) {
                const moments1 = momentsOfObservation.slice(0, i);
                const moments2 = momentsOfObservation.slice(i, j);
                const moments3 = momentsOfObservation.slice(j, k);
                const moments4 = momentsOfObservation.slice(k, momentsOfObservation.length);
                const value1 = getValuesForMomentsInPeriod(moments1);
                const value2 = getValuesForMomentsInPeriod(moments2);
                const value3 = getValuesForMomentsInPeriod(moments3);
                const value4 = getValuesForMomentsInPeriod(moments4);
                const values = [value1, value2, value3, value4];
                const firstBound = Math.floor(
                    (moments1[moments1.length - 1].duration + moments2[0].duration) / 2,
                );
                const secondBound = Math.floor(
                    (moments2[moments2.length - 1].duration + moments3[0].duration) / 2,
                );
                const thirdBound = Math.floor(
                    (moments3[moments3.length - 1].duration + moments4[0].duration) / 2,
                );

                if (checkFullValues(values)) {
                    const bound1: Bound = {
                        lowerBound: moments1[0].duration,
                        upperBound: moments1[moments1.length - 1].duration,
                    };
                    const bound2: Bound = {
                        lowerBound: moments2[0].duration - firstBound,
                        upperBound: moments2[moments2.length - 1].duration - firstBound,
                    };
                    const bound3: Bound = {
                        lowerBound: moments3[0].duration - secondBound,
                        upperBound: moments3[moments3.length - 1].duration - secondBound,
                    };
                    const bound4: Bound = {
                        lowerBound: moments4[0].duration - thirdBound,
                        upperBound: moments4[moments4.length - 1].duration - thirdBound,
                    };
                    const bounds: Bound[] = [bound1, bound2, bound3, bound4];

                    if (checkFullBounds(bounds)) {
                        const alternative = new Alternative(4, values, bounds);

                        alternatives.push(alternative);
                    }
                }
            }
        }
    }

    return alternatives;
};

const getAlternativesFor3Periods = (momentsOfObservation: MomentOfObservation[]): Alternative[] => {
    const alternatives: Alternative[] = [];

    for (let i = 1; i < momentsOfObservation.length - 1; i++) {
        for (let j = i + 1; j < momentsOfObservation.length; j++) {
            const moments1 = momentsOfObservation.slice(0, i);
            const moments2 = momentsOfObservation.slice(i, j);
            const moments3 = momentsOfObservation.slice(j, momentsOfObservation.length);
            const value1 = getValuesForMomentsInPeriod(moments1);
            const value2 = getValuesForMomentsInPeriod(moments2);
            const value3 = getValuesForMomentsInPeriod(moments3);
            const values = [value1, value2, value3];
            const firstBound = Math.floor(
                (moments1[moments1.length - 1].duration + moments2[0].duration) / 2,
            );
            const secondBound = Math.floor(
                (moments2[moments2.length - 1].duration + moments3[0].duration) / 2,
            );

            if (checkFullValues(values)) {
                const bound1: Bound = {
                    lowerBound: moments1[0].duration,
                    upperBound: moments1[moments1.length - 1].duration,
                };
                const bound2: Bound = {
                    lowerBound: moments2[0].duration - firstBound,
                    upperBound: moments2[moments2.length - 1].duration - firstBound,
                };
                const bound3: Bound = {
                    lowerBound: moments3[0].duration - secondBound,
                    upperBound: moments3[moments3.length - 1].duration - secondBound,
                };
                const bounds: Bound[] = [bound1, bound2, bound3];

                if (checkFullBounds(bounds)) {
                    const alternative = new Alternative(3, values, bounds);

                    alternatives.push(alternative);
                }
            }
        }
    }

    return alternatives;
};

const getAlternativesFor2Periods = (momentsOfObservation: MomentOfObservation[]): Alternative[] => {
    const alternatives: Alternative[] = [];

    for (let i = 1; i < momentsOfObservation.length; i++) {
        const moments1 = momentsOfObservation.slice(0, i);
        const moments2 = momentsOfObservation.slice(i, momentsOfObservation.length);
        const value1 = getValuesForMomentsInPeriod(moments1);
        const value2 = getValuesForMomentsInPeriod(moments2);
        const firstBound = Math.floor(
            (moments1[moments1.length - 1].duration + moments2[0].duration) / 2,
        );

        if (checkValues(value1, value2)) {
            const values = [value1, value2];
            const bound1: Bound = {
                lowerBound: moments1[0].duration,
                upperBound: moments1[moments1.length - 1].duration,
            };
            const bound2: Bound = {
                lowerBound: moments2[0].duration - firstBound,
                upperBound: moments2[moments2.length - 1].duration - firstBound,
            };
            const bounds = [bound1, bound2];

            if (checkFullBounds(bounds)) {
                const alternative = new Alternative(2, values, bounds);

                alternatives.push(alternative);
            }
        }
    }

    return alternatives;
};

const getAlternatives = (momentsOfObservation: MomentOfObservation[]): Alternative[] => {
    const alternatives: Alternative[] = [];
    const maxPeriodsAmount = momentsOfObservation.length > 5 ? 5 : momentsOfObservation.length;

    for (let i = 1; i <= maxPeriodsAmount; ++i) {
        if (i === 1) {
            const values = [getValuesForMomentsInPeriod(momentsOfObservation)];
            const lowerBound = momentsOfObservation[0].duration;
            const upperBound = momentsOfObservation[momentsOfObservation.length - 1].duration;
            const bound: Bound = {
                lowerBound,
                upperBound,
            };

            if (checkFullBounds([bound])) {
                const alternative = new Alternative(1, values, [bound]);

                alternatives.push(alternative);
            }
        }

        if (i === 2) {
            const alternatives2 = getAlternativesFor2Periods(momentsOfObservation);

            if (alternatives2.length > 0) {
                alternatives.push(...alternatives2);
            }
        }

        if (i === 3) {
            const alternatives3 = getAlternativesFor3Periods(momentsOfObservation);

            if (alternatives3.length > 0) {
                alternatives.push(...alternatives3);
            }
        }

        if (i === 4) {
            const alternatives4 = getAlternativesFor4Periods(momentsOfObservation);

            if (alternatives4.length > 0) {
                alternatives.push(...alternatives4);
            }
        }

        if (i === 5) {
            const alternatives5 = getAlternativesFor5Periods(momentsOfObservation);

            if (alternatives5.length > 0) {
                alternatives.push(...alternatives5);
            }
        }
    }

    return alternatives;
};

// eslint-disable-next-line no-restricted-globals
const scope = (self as unknown) as Worker;

scope.onmessage = ({ data: { indMoments } }) => {
    const alternativesRecord: Record<
        Disease['name'],
        Record<Attribute['name'], Alternative[]>
    > = {};
    const indPeriods: Period[] = [];

    indMoments.forEach((indMoment: IndMoment) => {
        const { diseaseName, attributeName, moments } = indMoment;
        const alternatives = getAlternatives(moments);

        if (alternativesRecord[diseaseName]) {
            if (alternativesRecord[diseaseName][attributeName]) {
                const prevAlternatives = alternativesRecord[diseaseName][attributeName];
                const currentAlternatives = getMergedAlternatives(prevAlternatives, alternatives);

                alternativesRecord[diseaseName][attributeName] = currentAlternatives;
            } else {
                alternativesRecord[diseaseName][attributeName] = alternatives;
            }
        } else {
            alternativesRecord[diseaseName] = {};
            alternativesRecord[diseaseName][attributeName] = alternatives;
        }
    });

    Object.entries(alternativesRecord).forEach(([diseaseName, attributes]) => {
        const disease = new Disease(v4(), diseaseName);

        Object.entries(attributes).forEach(([attributeName, alternatives]) => {
            const attribute = new Attribute(
                v4(),
                attributeName,
                { from: 0, to: 0 },
                { from: 0, to: 0 },
            );

            const periods = alternatives.map(
                ({ periodsAmount, bounds, values }) =>
                    new Period(v4(), disease, attribute, periodsAmount, values, bounds),
            );

            indPeriods.push(periods[periods.length - 1]);
        });
    });

    scope.postMessage({
        answer: indPeriods,
    });
};
