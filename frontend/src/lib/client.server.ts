import { cookies } from "next/headers";
import createFetchClient from "openapi-fetch";
import "server-only";

import type { paths } from "./api";

export const serverFetchClient = createFetchClient<paths>({
  baseUrl: "http://localhost:4000",
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
