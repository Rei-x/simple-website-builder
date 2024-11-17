import { Module } from "@nestjs/common";
import { PrismaModule } from "nestjs-prisma";
import { CaslModule } from "src/casl/casl.module";

import { MemberController } from "./member.controller";
import { MemberService } from "./member.service";

@Module({
  controllers: [MemberController],
  providers: [MemberService],
  imports: [PrismaModule, CaslModule],
  exports: [MemberService],
})
export class MemberModule {}
