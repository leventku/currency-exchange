export const roundToDecimal = (number, afterDecimalCount) => Math.round(number * 10 ** afterDecimalCount) / (10 ** afterDecimalCount);

export const removeFromArray = (array, toRemoveIdx) =>
  [...array.slice(0, toRemoveIdx), ...array.slice(toRemoveIdx + 1)];

