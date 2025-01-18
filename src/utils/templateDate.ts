const arrMonth = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Ags", "Sep", "Okt", "Nov", "Des"
];

export const formatDateDMY = (date: Date | string): string => {
  const parsedDate = new Date(date);
  const day = parsedDate.getDate();
  const month = parsedDate.getMonth();
  const year = parsedDate.getFullYear();

  return `${day} ${arrMonth[month]} ${year}`;
};

export const formatDateMY = (date: Date | string): string => {
  const parsedDate = new Date(date);
  const month = parsedDate.getMonth();
  const year = parsedDate.getFullYear();

  return `${arrMonth[month]} ${year}`;
};

export const generatePeriodYM = (date: Date | string): string => {
  const parsedDate = new Date(date);
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const year = parsedDate.getFullYear();

  return `${year}-${month}`;
};
