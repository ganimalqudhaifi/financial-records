export const storage = {
  getItem: (key) => JSON.parse(localStorage.getItem(key) || sessionStorage.getItem(key)),
};
