export const arrayNumberCount = (
  numbers: number[],
  selectedNumber: number,
): number => {
  let countedInstances = 0;

  numbers.forEach((number) => {
    if (number === selectedNumber) {
      countedInstances += 1;
    }
  });

  return countedInstances;
};
