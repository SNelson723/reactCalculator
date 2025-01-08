export const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return '';

  let computation = '';

  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
      break;
  }

  // finally return the evaluated operation
  return computation.toString();
};


export const formatOperand = (operand) => {
  // to format the number string
  const integerFormatter = new Intl.NumberFormat('en-us', {
    maximumFractionDigits: 0
  });

  // if there is nothing to format
  if (operand == null) return;

  const [integer, decimal] = operand.split('.');

  // if there is no decimal
  if (decimal == null) return integerFormatter.format(integer);

  // if there is a decimal
  return `${integerFormatter.format(integer)}.${decimal}`
};