import { Cookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";

const cookie = new Cookies();

export const setCookie = (
  name: string,
  value: any,
  option?: CookieSetOptions
): void => {
  return cookie.set(name, value, {
    path: "/",
    ...option,
  });
};

export const getCookie = (name: string) => cookie.get(name);

export const removeCookie = (name: string, option?: CookieSetOptions) => {
  const date = new Date(Date.now());

  cookie.remove(name, {
    expires: date,
    maxAge: 0,
    ...option,
  });
};
