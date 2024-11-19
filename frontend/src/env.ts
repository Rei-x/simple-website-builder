import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z.string().url().min(1),
    NEXT_PUBLIC_FRONTEND_DOMAIN: z.string().min(1),
  },
  server: {
    API_URL: z.string().url().min(1).optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_FRONTEND_DOMAIN: process.env.NEXT_PUBLIC_FRONTEND_DOMAIN,
    API_URL: process.env.API_URL,
  },
});
