export const evaluateTotalAmount = (amountInDollars) => {
  if (amountInDollars >= 0 && amountInDollars < 3.5) return amountInDollars;
  else {
    const base = 2.5;
    const roundedValue = Math.ceil(amountInDollars / base) * base;
    return roundedValue;
  }
};
