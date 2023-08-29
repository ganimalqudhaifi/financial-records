export const storage = {
  getItem: (key) => JSON.parse(localStorage.getItem(key) || sessionStorage.getItem(key)),
  getUID: () => {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    const uid = user ? JSON.parse(user).uid : null;
    return uid;
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },
};
