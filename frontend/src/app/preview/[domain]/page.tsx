import { Render } from "@measured/puck";
import { notFound } from "next/navigation";
import React from "react";

import { fetchClient } from "@/lib/client";

import config from "../../../../puck.config";

const Page = async ({
  params,
}: {
  params: {
    domain: string;
  };
}) => {
  const pageData = await fetchClient.GET("/v1/website", {
    params: {
      query: {
        domain: params.domain,
      },
    },
  });

  const first = pageData.data.at(0);

  if (!first) {
    return notFound();
  }

  return (
    <Render
      data={{
        content: first.blocks.toSorted((a, b) => a.order - b.order),
        root: {
          title: first.title,
          props: {
            title: first.title,
          },
        },
      }}
      config={config}
    />
  );
};

export default Page;
