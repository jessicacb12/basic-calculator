import { useCallback, useState } from "react";

import OperatorSignEnum from "../constants/operators";

const useCalculator = () => {
    const [isOn, setOn] = useState(true);
    const [calculation, setCalculation] = useState<Array<string | OperatorSignEnum>>([]);
    const [canCalculate, setCanCalculate] = useState(true);

    const handleReset = () => {
        setCalculation([]);
        setCanCalculate(true);
    }
    // example:
    // 5 x 2 x 3 / 4 + 1
    // if index + 2 >= array.length, return array
    // else if operator is not x / then multiplyDivideFirst index + 2
    // else multiplyDivideFirst index, modified array
    const multiplyDivideFirst = useCallback((index: number, formula: Array<string | OperatorSignEnum>): Array<string | OperatorSignEnum> => {
        if (index + 2 >= formula.length) return formula;
        else if (
            formula[index + 1] !== OperatorSignEnum.MULTIPLY &&
            formula[index + 1] !== OperatorSignEnum.DIVIDE
        ) return multiplyDivideFirst(index + 2, formula);
        else {
            const modified = [...formula];
            if (formula[index + 1] === OperatorSignEnum.MULTIPLY) 
                modified.splice(index, 3, String(parseFloat(formula[index]) * parseFloat(formula[index + 2])));
            else modified.splice(index, 3, String(parseFloat(formula[index]) / parseFloat(formula[index + 2])));
            return multiplyDivideFirst(index, modified);
        }
    }, []);

    const calculateAllValues = useCallback(() => {
        let total = 0;
        let operator: OperatorSignEnum | undefined = undefined;
        const multipliedDividedFirst = multiplyDivideFirst(0, calculation);
        for (const value of multipliedDividedFirst) {
            const parsedValue = parseFloat(value);
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
    }, [calculation, multiplyDivideFirst])

    const removeEndingDecimalValue = useCallback((lastInsertedValue: string) => {
        // delete decimal point if it ends the prev number
        if (lastInsertedValue.endsWith(OperatorSignEnum.DECIMAL))
            return lastInsertedValue.substring(0, lastInsertedValue.length - 1);
        return lastInsertedValue;
    }, []);

    const insertIntoCalculator = useCallback((value: string | OperatorSignEnum) => setCalculation(prev => {
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
                    case OperatorSignEnum.DECIMAL:
                        if (
                            current.length && // should not at the beginning of calculation
                            !isNaN(parseInt(current[current.length - 1])) && // should not at the beginning of number
                            !current[current.length - 1].includes(OperatorSignEnum.DECIMAL) // should not exist more than 1 decimal in a number
                        )
                            current[current.length - 1] += value;
                        break;
                    case OperatorSignEnum.ADD:
                    case OperatorSignEnum.MULTIPLY:
                    case OperatorSignEnum.DIVIDE:
                        if (current.length && !isNaN(parseInt(current[current.length - 1], 10))) {
                            current[current.length - 1] = removeEndingDecimalValue(current[current.length - 1]);
                            current.push(value);
                        }
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
                        ){
                            current[current.length - 1] = removeEndingDecimalValue(current[current.length - 1]);
                            current.push(value);
                        }
                        break;
                    case OperatorSignEnum.EQUAL:
                        if (current.length > 1 && !isNaN(parseInt(current[current.length - 1], 10))) {
                            current[current.length - 1] = removeEndingDecimalValue(current[current.length - 1]);
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
                        // current.push(value);
                        return [...prev, value];
                    }
                    else current[current.length - 1] += value; // else concate with previous
                } else current[0] = value;
            }
        }
        return current;
    }), [calculateAllValues, canCalculate, removeEndingDecimalValue]);

    return {
        isOn,
        calculation,
        handlePower: () => setOn(prev => {
            if (prev) handleReset();
            return !prev;
        }),
        handleReset,
        insertIntoCalculator,
    }
}

export default useCalculator;