import { Injectable } from "@nestjs/common";
import * as Prisma from "@prisma/client";
import * as argon2 from "argon2";
import { PrismaService } from "nestjs-prisma";

export type User = Prisma.User;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create({
    email,
    password,
    displayName,
  }: {
    email: string;
    password?: string;
    displayName?: string;
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        displayName: displayName ?? email,
        password: password ? await argon2.hash(password) : null,
      },
    });
  }
}
