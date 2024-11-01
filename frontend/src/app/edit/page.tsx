import "@measured/puck/puck.css";
import { Client } from "./client";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Edit",
};

export default async function Page() {
  return <Client />;
}
