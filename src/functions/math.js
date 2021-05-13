import { Solve_Expression } from "mathematics-expression-solver";

export const solve = expression => {
  let result = Solve_Expression(expression);
  return result;
};

const isNotNull = value => {
  if (value) {
    return true;
  } else {
    return false;
  }
};

export const isMath = textInput => {
  const individualChars = textInput.split("");
  const operatorChars = ["+", "-", "*", "/"];
  const operatorVal = individualChars.find(operator => {
    return operatorChars.includes(operator);
  });
  const operatorIndex = individualChars.indexOf(operatorVal);
  const preOp = textInput.substring(0, operatorIndex);
  const postOp = textInput.substring(operatorIndex, textInput.length);
  if (
    isNotNull(operatorVal) &&
    isNotNull(operatorIndex) &&
    isNotNull(preOp) &&
    isNotNull(postOp)
  ) {
    return true;
  } else {
    return false;
  }
};
