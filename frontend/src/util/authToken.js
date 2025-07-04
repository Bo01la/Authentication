import { redirect } from "react-router-dom";

// to automatically expire a token after 1 hr (duration is set in the backend)
export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}
// get token from local storage
export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

// using the received token in local storage
export function checkToken() {
  const token = getToken();
  return token;
}

// rote protection function
export function routeProtection() {
  const token = getToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}
