import { useState } from "react";

import OperatorSignEnum from "../constants/operators";

const useCalculator = () => {
    const [isOn, setOn] = useState(true);
    const [calculation, setCalculation] = useState<Array<string | OperatorSignEnum>>([]);
    const [canCalculate, setCanCalculate] = useState(true);

    const handleReset = () => {
        setCalculation([]);
        setCanCalculate(true);
    }

    const calculateAllValues = () => {
        let total = 0;
        let operator: OperatorSignEnum | undefined = undefined;

        for (const value of calculation) {
            const parsedValue = parseInt(value, 10);

            // number
            if (!isNaN(parsedValue)) {
                if (!total) total = parsedValue;
                else if (operator) {
                    switch (operator) {
                        case OperatorSignEnum.ADD:
                            total += parsedValue;
                            break;
                        case OperatorSignEnum.MULTIPLY:
                            total *= parsedValue;
                            break;
                        case OperatorSignEnum.DIVIDE:
                            total /= parsedValue;
                            break;
                        case OperatorSignEnum.SUBSTRACT:
                            total -= parsedValue;
                            break;
                        default:
                            break;
                    }
                    operator = undefined;
                }
            } else operator = value as OperatorSignEnum;
        }
        return total;
    }

    return {
        isOn,
        calculation,
        handlePower: () => setOn(prev => {
            if (prev) handleReset();
            return !prev;
        }),
        handleReset,
        insertIntoCalculator: (value: string | OperatorSignEnum) => setCalculation(prev => {
            const current = [...prev];
            const parsedValue = parseInt(value, 10);
            if (canCalculate) {
                if (value === OperatorSignEnum.DELETE && current.length) {
                    let lastInsertedValue = current[current.length - 1];

                    if (lastInsertedValue.length > 1){
                        current[current.length - 1] = lastInsertedValue.substring(0, lastInsertedValue.length - 1);
                    } else {
                        current.pop();
                    }
                } else if (isNaN(parsedValue)) {
                    // operator
                    switch(value) {
                        case OperatorSignEnum.ADD:
                        case OperatorSignEnum.MULTIPLY:
                        case OperatorSignEnum.DIVIDE:
                            if (current.length && !isNaN(parseInt(current[current.length - 1], 10)))
                                current.push(value);
                            break;
                        case OperatorSignEnum.SUBSTRACT:
                            // if this is the first char
                            // then append it as part of number
                            if (!current.length)
                                current[0] = value;
                            else if ( // no such thing as - 3 times in a row
                                !(
                                    current.length > 2 &&
                                    current[current.length - 1] === OperatorSignEnum.SUBSTRACT &&
                                    current[current.length - 2] === OperatorSignEnum.SUBSTRACT
                                )
                            )
                                current.push(value);
                            break;
                        case OperatorSignEnum.EQUAL:
                            if (current.length > 1 && !isNaN(parseInt(current[current.length - 1], 10))) {
                                current.push(value);
                                current.push(String(calculateAllValues()));
                                setCanCalculate(false);
                            }
                            break;
                        default:
                            break;
                    }
                } else {
                    if (current.length) {
                        // if previously is operator
                        if (isNaN(parseInt(current[current.length - 1], 10)) &&
                            current.length > 1 && // and length > 1. If prev is operator but length is 1, then maybe it's trying to calculate -[number]
                            (
                                current[current.length - 1] !== OperatorSignEnum.SUBSTRACT || // previously not a -
                                !isNaN(parseInt(current[current.length - 2], 10)) // or not trying to do [operator]-
                            )
                        ) {
                            current.push(value);
                        }
                        else current[current.length - 1] += value; // else concate with previous
                    } else current[0] = value;
                }
            }
            return current;
        })
    }
}

export default useCalculator;