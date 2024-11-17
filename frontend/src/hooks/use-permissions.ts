import {
  AnyAbility,
  type InferSubjects,
  type MongoQuery,
  PureAbility,
  defineAbility,
  subject,
} from "@casl/ability";
import { packRules, unpackRules } from "@casl/ability/extra";
import * as prisma from "@casl/prisma";
import { createContextualCan } from "@casl/react";
import { createContext } from "react";

import type {
  SchemaMemberEntity,
  SchemaUserEntity,
  SchemaWebsiteEntity,
} from "@/lib/api";
import { $api } from "@/lib/client";

type Actions = "create" | "read" | "update" | "delete" | "manage";
type Subjects = InferSubjects<
  SchemaWebsiteEntity | SchemaMemberEntity | SchemaUserEntity
>;

const ability = prisma.createPrismaAbility<[Actions, Subjects]>();

export const AbilityContext = createContext(ability);
export const Can = createContextualCan(AbilityContext.Consumer);

export const usePermissions = () => {
  const permissions = $api.useSuspenseQuery(
    "get",
    "/v1/user/permissions",
    {},
    {
      refetchInterval: 3000,
    },
  );

  ability.update(unpackRules((permissions.data as never) ?? []));

  return ability;
};
