import { cookies } from "next/headers";
import createFetchClient from "openapi-fetch";
import "server-only";

import { env } from "@/env";

import type { paths } from "./api";

export const serverFetchClient = createFetchClient<paths>({
  baseUrl: env.NEXT_PUBLIC_API_URL,
  cache: "no-store",
  fetch(input) {
    return fetch(input, {
      headers: {
        Cookie: cookies()
          .getAll()
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; "),
      },
    });
  },
});
