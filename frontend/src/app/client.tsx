"use client";

import { Render } from "@measured/puck";
import config from "../../puck.config";
import { useAtomValue } from "jotai";
import { pageAtom } from "@/atoms/pageData";

export function Client() {
  const data = useAtomValue(pageAtom);

  return <Render config={config} data={data} />;
}
