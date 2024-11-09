import "@measured/puck/puck.css";

import { fetchClient } from "@/lib/client";

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
  const website = await fetchClient.GET("/v1/website/{id}", {
    params: {
      path: {
        id: params.id,
      },
    },
  });
  return <Client website={website.data} />;
}
