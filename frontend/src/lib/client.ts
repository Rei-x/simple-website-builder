import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

import type { paths } from "./api";

export const fetchClient = createFetchClient<paths>({
  baseUrl: "http://localhost:4000",
  cache: "no-store",
});

export const $api = createClient(fetchClient);
