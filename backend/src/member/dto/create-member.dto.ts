import { Role } from "@prisma/client";
import { IsEmail, IsEnum } from "class-validator";

import { RoleEnumDecorator } from "../entities/member.entity";

export class CreateMemberDto {
  @IsEmail()
  email: string;

  @IsEnum(Role)
  @RoleEnumDecorator()
  role: Role;
}
