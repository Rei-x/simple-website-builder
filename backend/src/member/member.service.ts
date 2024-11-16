import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { CreateMemberDto } from "./dto/create-member.dto";
import { UpdateMemberDto } from "./dto/update-member.dto";
import type { MemberEntity } from "./entities/member.entity";

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  create(websiteId: number, createMemberDto: CreateMemberDto) {
    return this.prisma.member.create({
      data: {
        role: createMemberDto.role,
        user: {
          connect: {
            email: createMemberDto.email,
          },
        },
        website: {
          connect: {
            id: websiteId,
          },
        },
      },
    });
  }

  async findAll(websiteId: number): Promise<MemberEntity[]> {
    const result = await this.prisma.member.findMany({
      where: {
        websiteId,
      },
      include: {
        user: true,
      },
    });

    return result;
  }

  findOne(id: number): Promise<MemberEntity> {
    return this.prisma.member.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          omit: {
            password: true,
          },
        },
      },
    });
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return this.prisma.member.update({
      where: {
        id,
      },
      data: {
        role: updateMemberDto.role,
      },
    });
  }

  remove(id: number) {
    return this.prisma.member.delete({
      where: {
        id,
      },
    });
  }
}
