"use client";

import { Puck } from "@measured/puck";
import config from "../../../puck.config";
import { useAtom } from "jotai";
import { pageAtom } from "@/atoms/pageData";

export function Client() {
  const [data, setData] = useAtom(pageAtom);

  return (
    <Puck
      headerTitle="Simple website builder"
      headerPath="/"
      config={config}
      data={data}
      overrides={{
        header: () => null,
      }}
      onChange={async (data) => {
        setData(data);
      }}
    />
  );
}
