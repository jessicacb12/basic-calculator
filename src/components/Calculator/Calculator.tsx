import OperatorSignEnum from "../../constants/operators";
import useCalculator from "../../hooks/useCalculator";

import CalculatorButton from "../CalculatorButton";

import {
  CalculatorScreen,
  MainContainer,
  OnOffButton,
  ResetButton,
} from "./styles";

const Calculator = () => {
  const { handlePower, calculation, isOn, handleReset, insertIntoCalculator } =
    useCalculator();

  return (
    <MainContainer>
      <CalculatorScreen data-testid="calculator-screen">
        {calculation.length ? <p>{calculation.join(" ")}</p> : null}
      </CalculatorScreen>
      <CalculatorButton
        onClick={insertIntoCalculator}
        disabled={!isOn}
        rowCol={[0, 0]}
        value={9}
      />
      <CalculatorButton
        onClick={insertIntoCalculator}
        disabled={!isOn}
        rowCol={[0, 1]}
        value={8}
      />
      <CalculatorButton
        onClick={insertIntoCalculator}
        disabled={!isOn}
        rowCol={[0, 2]}
        value={7}
      />
      <OnOffButton type="button" onClick={handlePower}>
        &#x23FB;
      </OnOffButton>
      <CalculatorButton
        onClick={insertIntoCalculator}
        disabled={!isOn}
        rowCol={[1, 0]}
        value={6}
      />
      <CalculatorButton
        onClick={insertIntoCalculator}
        disabled={!isOn}
        rowCol={[1, 1]}
        value={5}
      />
      <CalculatorButton
        onClick={insertIntoCalculator}
        disabled={!isOn}
        rowCol={[1, 2]}
        value={4}
      />
      <CalculatorButton
        onClick={insertIntoCalculator}
        disabled={!isOn}
        rowCol={[1, 3]}
        value={OperatorSignEnum.DELETE}
      />
      <ResetButton onClick={handleReset} data-disabled={!isOn} disabled={!isOn}>
        C
      </ResetButton>
      <CalculatorButton
        onClick={insertIntoCalculator}
        disabled={!isOn}
        rowCol={[2, 0]}
        value={3}
      />
      <CalculatorButton
        onClick={insertIntoCalculator}
        disabled={!isOn}
        rowCol={[2, 1]}
        value={2}
      />
      <CalculatorButton
        onClick={insertIntoCalculator}
        disabled={!isOn}
        rowCol={[2, 2]}
        value={1}
      />
      <CalculatorButton
        onClick={insertIntoCalculator}
        disabled={!isOn}
        rowCol={[2, 3]}
        value={OperatorSignEnum.MULTIPLY}
      />
      <CalculatorButton
        onClick={insertIntoCalculator}
        disabled={!isOn}
        rowCol={[2, 4]}
        value={OperatorSignEnum.DIVIDE}
      />
      <CalculatorButton
        onClick={insertIntoCalculator}
        disabled={!isOn}
        rowCol={[3, 0]}
        value={OperatorSignEnum.DECIMAL}
      />
      <CalculatorButton
        onClick={insertIntoCalculator}
        disabled={!isOn}
        rowCol={[3, 1]}
        value={0}
      />
      <CalculatorButton
        onClick={insertIntoCalculator}
        disabled={!isOn}
        rowCol={[3, 2]}
        value={OperatorSignEnum.EQUAL}
      />
      <CalculatorButton
        onClick={insertIntoCalculator}
        disabled={!isOn}
        rowCol={[3, 3]}
        value={OperatorSignEnum.ADD}
      />
      <CalculatorButton
        onClick={insertIntoCalculator}
        disabled={!isOn}
        rowCol={[3, 4]}
        value={OperatorSignEnum.SUBSTRACT}
      />
    </MainContainer>
  );
};
export default Calculator;
