import { packRules } from "@casl/ability/extra";
import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthenticationGuard } from "src/auth/jwt.guard";
import { RequestWithUser } from "src/auth/request-with-user.interface";
import { CaslAbilityFactory } from "src/casl/casl-ability.factory";

import { UserEntity } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller()
export class UsersController {
  constructor(
    private usersService: UsersService,
    private casl: CaslAbilityFactory,
  ) {}

  @Get("user")
  @UseGuards(JwtAuthenticationGuard)
  async getUser(@Req() req: RequestWithUser): Promise<UserEntity> {
    const user = await this.usersService.findOne(req.user.userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  @Get("user/permissions")
  @UseGuards(JwtAuthenticationGuard)
  async getUserPermissions(@Req() req: RequestWithUser) {
    const { rules } = await this.casl.createForUser({
      userId: req.user.userId,
    });
    const packagedRules = packRules(rules);

    return packagedRules;
  }
}
