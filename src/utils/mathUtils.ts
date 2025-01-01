export const generateProblem = (level: number) => {
  const operators = level === 1 ? ['+'] : level === 2 ? ['+', '-'] : ['+', '-', '*'];
  const maxNum = level * 10;
  const num1 = Math.floor(Math.random() * maxNum) + 1;
  const num2 = Math.floor(Math.random() * maxNum) + 1;
  const operator = operators[Math.floor(Math.random() * operators.length)];
  
  return { num1, num2, operator };
};

export const calculateAnswer = (num1: number, num2: number, operator: string): number => {
  switch (operator) {
    case '+': return num1 + num2;
    case '-': return num1 - num2;
    case '*': return num1 * num2;
    default: return 0;
  }
};