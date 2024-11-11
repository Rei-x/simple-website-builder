import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "nestjs-prisma";

import { UsersService } from "./users.service";
import { UsersController } from './users.controller';

@Module({
  imports: [ConfigModule, PrismaModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
