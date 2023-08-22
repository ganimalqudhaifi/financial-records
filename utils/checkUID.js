export default function checkUID() {
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  const { uid } = JSON.parse(user);
  return uid;
}
