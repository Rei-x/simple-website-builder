import { Role } from "@prisma/client";
import { IsEnum } from "class-validator";

import { RoleEnumDecorator } from "../entities/member.entity";

export class UpdateMemberDto {
  @IsEnum(Role)
  @RoleEnumDecorator()
  role: Role;
}
