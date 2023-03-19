import OperatorSignEnum from "../../constants/operators";
import { GRID_COL_NUMBERS, GRID_ROW_NUMBERS } from "../../constants/grid";

import { DefaultButton } from "./styles";
import { useMemo } from "react";

interface CalculatorButtonProps {
  disabled: boolean;
  rowCol: number[];
  value: number | OperatorSignEnum;
  onClick: (value: string | OperatorSignEnum) => void;
}

const CalculatorButton = (props: CalculatorButtonProps) => {
  const { disabled, rowCol, value, onClick } = props;

  const renderValue = useMemo(() => {
    switch (value) {
      case OperatorSignEnum.DELETE:
        return <>&#8592;</>;
      default:
        return value;
    }
  }, [value]);

  return (
    <DefaultButton
      data-disabled={disabled}
      disabled={disabled}
      onClick={() => onClick(String(value))}
      style={{
        gridRow: GRID_ROW_NUMBERS[rowCol[0]],
        gridColumn: GRID_COL_NUMBERS[rowCol[1]],
      }}
    >
      {renderValue}
    </DefaultButton>
  );
};
export default CalculatorButton;
