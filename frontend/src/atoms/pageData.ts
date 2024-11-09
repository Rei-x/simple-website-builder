import type { Data } from "@measured/puck";
import { atomWithStorage } from "jotai/utils";

export const pageAtom = atomWithStorage<Data>(
  "puck-page",
  {
    root: undefined,
    content: [],
  },
  undefined,
  {
    getOnInit: true,
  },
);
