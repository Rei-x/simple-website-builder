import { Role } from "@prisma/client";
import { IsBoolean, IsEnum, IsOptional } from "class-validator";

import { RoleEnumDecorator } from "../entities/member.entity";

export class UpdateMemberDto {
  @IsEnum(Role)
  @IsOptional()
  @RoleEnumDecorator()
  role?: Role;

  @IsBoolean()
  @IsOptional()
  hasAcceptedInvite?: boolean;
}
