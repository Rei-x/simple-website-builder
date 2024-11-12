import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z.string().url().min(1),
  },
  server: {
    APP_DOMAIN: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    APP_DOMAIN: process.env.APP_DOMAIN,
  },
});
