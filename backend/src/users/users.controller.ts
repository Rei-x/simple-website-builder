import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthenticationGuard } from "src/auth/jwt.guard";
import type { RequestWithUser } from "src/auth/request-with-user.interface";

import { UserEntity } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("user")
  @UseGuards(JwtAuthenticationGuard)
  async getUser(@Req() req: RequestWithUser): Promise<UserEntity> {
    const user = await this.usersService.findOne(req.user.userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }
}
