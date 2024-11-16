import { Module } from "@nestjs/common";
import { PrismaModule } from "nestjs-prisma";

import { CaslAbilityFactory } from "./casl-ability.factory";
import { PoliciesGuard } from "./policies.guard";

@Module({
  providers: [CaslAbilityFactory, PoliciesGuard],
  exports: [CaslAbilityFactory, PoliciesGuard],
  imports: [PrismaModule],
})
export class CaslModule {}
