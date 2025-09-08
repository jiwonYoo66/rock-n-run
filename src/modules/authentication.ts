import { removeCookie, setCookie } from "@utils/cookies";

export const userLogin = (token: string) => {
  setCookie("RNRT", token);
  window.location.href = "/";
};

export const userLogout = () => {
  removeCookie("RNRT");
  window.location.href = "/";
};
