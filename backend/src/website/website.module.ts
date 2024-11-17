import { Module } from "@nestjs/common";
import { PrismaModule } from "nestjs-prisma";
import { CaslModule } from "src/casl/casl.module";
import { MemberModule } from "src/member/member.module";

import { WebsiteController } from "./website.controller";
import { WebsiteService } from "./website.service";

@Module({
  imports: [PrismaModule, CaslModule, MemberModule],
  controllers: [WebsiteController],
  providers: [WebsiteService],
})
export class WebsiteModule {}
