"use client";

import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { type ReactNode } from "react";

import { AbilityContext, usePermissions } from "@/hooks/use-permissions";
import { $api } from "@/lib/client";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: $api.queryOptions("get", "/v1/user/permissions").queryKey,
      });
    },
  }),
});

const PermissionProvider = ({ children }: { children: ReactNode }) => {
  const ability = usePermissions();

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};

export const Providers = ({
  children,
  isLoggedIn,
}: {
  children: ReactNode;
  isLoggedIn: boolean;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {isLoggedIn ? (
        <PermissionProvider>{children}</PermissionProvider>
      ) : (
        children
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
