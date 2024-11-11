import { cookies } from "next/headers";

export const isLoggedIn = () => {
  return cookies().has("Authentication");
};
