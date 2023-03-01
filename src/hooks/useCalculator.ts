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
                        default:
                            break;
                    }
                    operator = undefined;
                }
            } else {
                operator = value as OperatorSignEnum;
            }
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

            // operator
            if (isNaN(parsedValue)) {
                switch(value) {
                    case OperatorSignEnum.ADD:
                    case OperatorSignEnum.MULTIPLY:
                        if (current.length && !isNaN(parseInt(current[current.length - 1], 10)))
                            current.push(value);
                        break;
                    case OperatorSignEnum.EQUAL:
                        if (current.length && !isNaN(parseInt(current[current.length - 1], 10))) {
                            current.push(value);
                            current.push(String(calculateAllValues()));
                            setCanCalculate(false);
                        }
                        break;
                    default:
                        break;
                }
            } else if (canCalculate) {
                // if previously is operator then push new
                // else concate with previous
                if (isNaN(parseInt(current[current.length - 1], 10)) && current[current.length - 1] !== OperatorSignEnum.SUBSTRACT)
                    current.push(value);
                else current[current.length - 1] += value;
            }
            return current;
        })
    }
}

export default useCalculator;