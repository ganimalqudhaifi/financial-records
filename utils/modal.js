export const modal = {
  show: (id) => {
    document.getElementById(id).style.display = 'block';
  },
  hide: (id) => {
    document.getElementById(id).style.display = 'none';
  },
  close: (e, id) => {
    if (e.target === document.getElementById(id)) {
      document.getElementById(id).style.display = 'none';
    }
  },
};
