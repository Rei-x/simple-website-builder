import "@measured/puck/puck.css";
import { notFound } from "next/navigation";

import { checkAuth } from "@/lib/auth";
import { serverFetchClient } from "@/lib/client.server";

import { Client } from "./client";

export const metadata = {
  title: "Edit",
};

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const website = await serverFetchClient.GET("/v1/website/{id}", {
    params: {
      path: {
        id: params.id,
      },
    },
  });

  if (!website.data) {
    return notFound();
  }

  return <Client website={website.data} />;
}
