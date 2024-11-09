"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { $api } from "@/lib/client";

import { Button } from "./ui/button";

export const CreateWebsite = () => {
  const create = $api.useMutation("post", "/v1/website");
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await create.mutateAsync(
          {
            body: {
              name: "Nowa strona",
              title: "Witaj na mojej stronie!",
            },
          },
          {
            onSuccess: (website) => {
              router.push(`/edit/${website.id}`);
            },
          },
        );
      }}
      disabled={create.isPending}
      className="ml-auto mr-4"
    >
      {create.isPending ? (
        <Loader2 className={"mr-2 h-4 w-4 animate-spin"} />
      ) : (
        <PlusIcon className="h-5 w-5" />
      )}
      Nowa strona
    </Button>
  );
};
