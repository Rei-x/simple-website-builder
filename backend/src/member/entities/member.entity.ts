import { ApiProperty } from "@nestjs/swagger";
import { Prisma, Role } from "@prisma/client";
import type { UserEntity } from "src/users/entities/user.entity";

export const RoleEnumDecorator = () =>
  ApiProperty({
    enum: Role,
    enumName: "Role",
  });

export class MemberEntity
  implements
    Prisma.MemberGetPayload<{
      include: {
        user: {
          omit: {
            password: true;
          };
        };
      };
    }>
{
  user: UserEntity;
  id: number;
  websiteId: number;
  userId: number;

  @RoleEnumDecorator()
  role: Role;
  hasAcceptedInvite: boolean;
  createdAt: Date;
  updatedAt: Date;
}
