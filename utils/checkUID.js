export default function checkUID() {
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  const uid = user ? JSON.parse(user).uid : null;
  return uid;
}
