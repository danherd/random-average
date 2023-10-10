export const arrayAverage = (numbers: number[]) => {
  if (numbers.length === 0) {
    return 0;
  }

  const sumOfNumbers = numbers.reduce((previous, current) => {
    return previous + current;
  }, 0);

  return sumOfNumbers / numbers.length;
};
