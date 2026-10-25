export const countWorkingDays = (start, end, weekend = [0,6], holidays = []) => {
  let count = 0;
  const s = new Date(start);
  const e = new Date(end);
  s.setHours(0,0,0,0); e.setHours(0,0,0,0);
  const holidaySet = new Set(holidays.map(h => new Date(h).toISOString().slice(0,10)));
  for (let d = new Date(s); d <= e; d.setDate(d.getDate()+1)) {
    const day = d.getDay();
    if (weekend.includes(day)) continue;
    const key = d.toISOString().slice(0,10);
    if (holidaySet.has(key)) continue;
    count++;
  }
  return count;
};
