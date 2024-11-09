import { Module } from "@nestjs/common";
import { PrismaModule } from "nestjs-prisma";

import { WebsiteController } from "./website.controller";
import { WebsiteService } from "./website.service";

@Module({
  imports: [PrismaModule],
  controllers: [WebsiteController],
  providers: [WebsiteService],
})
export class WebsiteModule {}
