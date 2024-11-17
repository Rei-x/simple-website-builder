import { accessibleBy } from "@casl/prisma";
import { Injectable } from "@nestjs/common";
import { Role } from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";
import { PrismaService } from "nestjs-prisma";
import { Action, CaslAbilityFactory } from "src/casl/casl-ability.factory";
import { MemberService } from "src/member/member.service";

import { CreateWebsiteDto } from "./dto/create-website.dto";
import { UpdateWebsiteDto } from "./dto/update-website.dto";
import { WebsiteEntity } from "./entities/website.entity";

const words = [
  "jablko",
  "gruszka",
  "banan",
  "truskawka",
  "malina",
  "wisnia",
  "porzeczka",
  "agrest",
  "winogrono",
  "arbuz",
  "melon",
  "pomarancza",
  "mandarynka",
  "cytryna",
  "grejpfrut",
  "brzoskwinia",
  "nektarynka",
  "morela",
  "sliwka",
  "czeresnia",
];

const randomDomain = () => {
  const domain = randomUUID().split("-").slice(0, 2).join("");
  return words[Math.floor(Math.random() * words.length)] + domain;
};

@Injectable()
export class WebsiteService {
  constructor(
    private prisma: PrismaService,
    private readonly membersService: MemberService,
    private caslFactory: CaslAbilityFactory,
  ) {}
  async create(
    createWebsiteDto: CreateWebsiteDto,
    userId: number,
  ): Promise<WebsiteEntity> {
    const website = await this.prisma.website.create({
      select: {
        id: true,
      },
      data: {
        domain: randomDomain(),
        name: createWebsiteDto.name,
        title: createWebsiteDto.title ?? "Moja strona",
        members: {
          create: {
            role: Role.ADMIN,
            userId,
            hasAcceptedInvite: true,
          },
        },
      },
    });

    return this.findOne(website.id, userId);
  }

  async findAll(userId: number) {
    const casl = await this.caslFactory.createForUser({ userId });
    const websites = await this.prisma.website.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: accessibleBy(casl, Action.Read).Website,
    });

    return Promise.all(
      websites.map((website) => this.findOne(website.id, userId)),
    );
  }

  async findUserWebsites(domain: string): Promise<WebsiteEntity[]> {
    const website = await this.prisma.website.findUniqueOrThrow({
      select: {
        id: true,
      },
      where: {
        domain,
      },
    });

    return [await this.findOne(website.id)];
  }

  async findOne(id: number, userId?: number): Promise<WebsiteEntity> {
    const website = await this.prisma.website.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        blocks: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    return {
      ...website,
      member: userId
        ? await this.membersService.findOneByUserId(userId, website.id)
        : undefined,
    };
  }

  async update(id: number, userId: number, updateWebsiteDto: UpdateWebsiteDto) {
    await this.prisma.website.update({
      where: {
        id,
        members: {
          some: {
            userId,
          },
        },
      },
      data: {
        name: updateWebsiteDto.name,
        title: updateWebsiteDto.title,
        domain: updateWebsiteDto.domain,
        blocks: {
          deleteMany: {},
          createMany: {
            data: updateWebsiteDto.blocks.map((block, i) => ({
              type: block.type,
              order: i,
              id: block.id,
              props: block.props as InputJsonValue,
            })),
          },
        },
      },
      include: {
        blocks: true,
      },
    });
  }

  async remove(id: number, userId: number) {
    await this.prisma.website.delete({
      where: {
        id,
        members: {
          some: {
            userId,
          },
        },
      },
    });
  }
}
