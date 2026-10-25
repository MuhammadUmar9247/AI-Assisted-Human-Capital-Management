export const calcTax = (gross) => {
  // PKR illustrative as per brief
  if (gross <= 600000) return 0;
  if (gross <= 1200000) return Math.round((gross - 600000) * 0.05);
  if (gross <= 2400000) return Math.round(30000 + (gross - 1200000) * 0.15);
  if (gross <= 3600000) return Math.round(210000 + (gross - 2400000) * 0.25);
  return Math.round(510000 + (gross - 3600000) * 0.35);
};
