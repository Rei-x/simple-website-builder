import * as Prisma from "@prisma/client";
import { Transform } from "class-transformer";

export class UserEntity implements Omit<Prisma.User, "password"> {
  id: number;
  displayName: string;
  email: string;
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;
  @Transform(({ value }) => value.toISOString())
  updatedAt: Date;
}
