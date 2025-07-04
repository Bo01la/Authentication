export function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function checkToken() {
  const token = getToken(); // if we have token will return true and if not then will return false
  return token;
}
