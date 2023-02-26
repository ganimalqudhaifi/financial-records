export default function checkUID() {
  const uid = localStorage.getItem('uid') || sessionStorage.getItem('uid');
  return uid;
}
