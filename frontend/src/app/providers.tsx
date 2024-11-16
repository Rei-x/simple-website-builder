"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type ReactNode } from "react";

import { AbilityContext, usePermissions } from "@/hooks/use-permissions";
import { $api } from "@/lib/client";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: $api.queryOptions("get", "/v1/user/permissions").queryKey,
        });
      },
    },
  },
});

const PermissionProvider = ({ children }: { children: ReactNode }) => {
  const ability = usePermissions();

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PermissionProvider>{children}</PermissionProvider>
    </QueryClientProvider>
  );
};
