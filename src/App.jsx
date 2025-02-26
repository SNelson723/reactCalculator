import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import { evaluate, formatOperand } from "./helperFunctions";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete_digit',
  CHOOSE_OPERATION: 'choose_operation',
  EVALUATE: 'evaluate'
};

const reducer = (state, { type, payload }) => {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }

      if (payload.digit === '0' && state.currentOperand === '0') return state;
      if (payload.digit === '.' && state.currentOperand.includes('.')) return state;

      // default behavior
      return{
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.CHOOSE_OPERATION:
      // if nothing was clicked
      if (state.currentOperand == null && state.previousOperand == null) return state;

      // if you need to switch operands mid evaluation
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      // if the current operand is not null
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      // default behavior
      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operation: payload.operation
      }
    // calculate the operation
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currentOperand == null || state.operation == null) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        currentOperand: evaluate(state),
        operation: null
      }
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) return state;
      // if only one digit is left
      if (state.currentOperand.length === 1) {
        return {...state, currentOperand: null}
      }

      // default behavior
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
  }
};

const App = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>

      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>

      <OperationButton operation='÷' dispatch={dispatch} />
      <DigitButton digit='1' dispatch={dispatch} />
      <DigitButton digit='2' dispatch={dispatch} />
      <DigitButton digit='3' dispatch={dispatch} />

      <OperationButton operation='*' dispatch={dispatch} />
      <DigitButton digit='4' dispatch={dispatch} />
      <DigitButton digit='5' dispatch={dispatch} />
      <DigitButton digit='6' dispatch={dispatch} />

      <OperationButton operation='+' dispatch={dispatch} />
      <DigitButton digit='7' dispatch={dispatch} />
      <DigitButton digit='8' dispatch={dispatch} />
      <DigitButton digit='9' dispatch={dispatch} />

      <OperationButton operation='-' dispatch={dispatch} />
      <DigitButton digit='.' dispatch={dispatch} />
      <DigitButton digit='0' dispatch={dispatch} />
      <button className="span-two"  onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>

    </div>

  )
};

export default App;