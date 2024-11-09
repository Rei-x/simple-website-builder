"use client";

import { type Data, Puck, usePuck } from "@measured/puck";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { pageAtom } from "@/atoms/pageData";
import { Button } from "@/components/ui/button";
import type { components } from "@/lib/api";
import { $api } from "@/lib/client";

import config, { type Props, type RootProps } from "../../../../puck.config";

export function Client({
  website,
}: {
  website: components["schemas"]["WebsiteEntity"];
}) {
  const initialData = {
    root: {
      title: website.title,
      props: {
        title: website.title,
        domain: website.domain,
        name: website.name,
      } satisfies RootProps,
    },
    content: website.blocks.map((block) => ({
      props: block.props,
      type: block.type,
    })) as never,
  };

  const [data, setData] = useState<Data<Props, RootProps>>(initialData);
  const router = useRouter();
  const updateWebsite = $api.useMutation("patch", "/v1/website/{id}", {
    onSuccess: () => {
      router.refresh();
      toast.success("Strona została opublikowana");
    },
    onError: (e, hello) => {
      console.log(e, hello);
      toast.error("Błąd podczas publikowania strony");
    },
  });

  return (
    <Puck
      headerTitle={website.name}
      headerPath={""}
      config={config}
      data={data}
      overrides={{
        headerActions: () => {
          return (
            <>
              <Button
                loading={updateWebsite.isPending}
                onClick={() => {
                  updateWebsite.mutate({
                    body: {
                      name: data.root.props.name,
                      title: data.root.props.title,
                      domain: data.root.props.domain,
                      blocks: data.content.map((block) => ({
                        id: block.props.id,
                        props: block.props as unknown as Record<string, never>,
                        type: block.type,
                      })),
                    },
                    params: {
                      path: {
                        id: website.id.toString(),
                      },
                    },
                  });
                }}
              >
                Opublikuj
              </Button>
            </>
          );
        },
      }}
      onChange={async (data) => {
        setData(data);
      }}
    />
  );
}
