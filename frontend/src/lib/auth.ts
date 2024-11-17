import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const isLoggedIn = () => {
  return cookies().has("Authentication");
};

export const checkAuth = () => {
  if (!isLoggedIn()) {
    redirect("/login");
  }
};
