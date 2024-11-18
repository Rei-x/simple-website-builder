import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

import { env } from "@/env";

import type { paths } from "./api";

const fetchClient = createFetchClient<paths>({
  baseUrl: env.NEXT_PUBLIC_API_URL,
  cache: "no-store",
});

export const $api = createClient(fetchClient);
