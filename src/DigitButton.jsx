import { ACTIONS } from "./App";

const DigitButton = ({ digit, dispatch }) => {
  return <button onClick={() => dispatch({ type})}>{digit}</button>
};

export default DigitButton;