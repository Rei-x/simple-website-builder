import { Injectable } from "@nestjs/common";
import { Role } from "@prisma/client";
import type { InputJsonValue } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";
import { PrismaService } from "nestjs-prisma";

import { CreateWebsiteDto } from "./dto/create-website.dto";
import { UpdateWebsiteDto } from "./dto/update-website.dto";
import type { WebsiteEntity } from "./entities/website.entity";

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
  constructor(private prisma: PrismaService) {}
  async create(createWebsiteDto: CreateWebsiteDto, userId: number) {
    return await this.prisma.website.create({
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
      include: {
        blocks: true,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.website.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
    });
  }

  async findUserWebsites(options?: {
    domain?: string;
    userId?: number;
  }): Promise<WebsiteEntity[]> {
    const websites = await this.prisma.website.findMany({
      include: {
        blocks: {
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      where: options?.domain
        ? {
            domain: options?.domain,
          }
        : {
            members: {
              some: {
                userId: options?.userId,
              },
            },
          },
    });

    return websites;
  }

  async findOne(id: number, userId: number): Promise<WebsiteEntity | null> {
    const website = await this.prisma.website.findUnique({
      where: {
        id,
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        blocks: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!website) {
      return null;
    }

    return website;
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
