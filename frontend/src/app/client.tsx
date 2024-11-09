"use client";

import { Render } from "@measured/puck";
import { useAtomValue } from "jotai";

import { pageAtom } from "@/atoms/pageData";

import config from "../../puck.config";

export function Client() {
  const data = useAtomValue(pageAtom);

  return <Render config={config} data={data} />;
}
