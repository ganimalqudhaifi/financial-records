const arrMonth = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Ags",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export const templateDateDMY = (date: Date | string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();

  return `${day} ${arrMonth[month]} ${year}`;
};

export const templateDateMY = (date: Date | string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth();

  return `${arrMonth[month + 1]} ${year}`;
};

export const generatePeriodYM = (date: Date | string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth();

  return `${year}-${month}`;
};
