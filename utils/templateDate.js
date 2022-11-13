export const templateDateDMY = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();

  const arrMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${day} ${arrMonth[month]} ${year}`;
};

export const templateDateMY = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth();

  const arrMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${arrMonth[month + 1]} ${year}`;
};
