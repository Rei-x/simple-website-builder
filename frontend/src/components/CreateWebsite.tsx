"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

import { $api } from "@/lib/client";

import { Button } from "./ui/button";

export const CreateWebsite = ({ className }: { className?: string }) => {
  const create = $api.useMutation("post", "/v1/website", {
    onMutate: () => {
      setIsLoading(true);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const [isLoading, setIsLoading] = useState(false);
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
            onError: () => {
              setIsLoading(false);
              toast.error("Nie udało się utworzyć nowej strony");
            },
          },
        );
      }}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <Loader2 className={"mr-2 h-4 w-4 animate-spin"} />
      ) : (
        <PlusIcon className="h-5 w-5" />
      )}
      Nowa strona
    </Button>
  );
};
