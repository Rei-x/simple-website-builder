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
    const { Block: blocks, ...website } = await this.prisma.website.create({
      data: {
        domain: randomDomain(),
        name: createWebsiteDto.name,
        title: createWebsiteDto.title ?? "Moja strona",
        Access: {
          create: {
            role: Role.ADMIN,
            userId,
          },
        },
      },
      include: {
        Block: true,
      },
    });

    return {
      ...website,
      blocks,
    };
  }

  findAll(userId: number) {
    return this.prisma.website.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        Access: {
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
        Block: {
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
            Access: {
              some: {
                userId: options?.userId,
              },
            },
          },
    });

    return websites.map((website) => ({
      ...website,
      blocks: website.Block,
    }));
  }

  async findOne(id: number, userId: number): Promise<WebsiteEntity | null> {
    const website = await this.prisma.website.findUnique({
      where: {
        id,
        Access: {
          some: {
            userId,
          },
        },
      },
      include: {
        Block: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!website) {
      return null;
    }

    const { Block: blocks, ...rest } = website;

    return {
      ...rest,
      blocks,
    };
  }

  async update(id: number, userId: number, updateWebsiteDto: UpdateWebsiteDto) {
    await this.prisma.website.update({
      where: {
        id,
        Access: {
          some: {
            userId,
          },
        },
      },
      data: {
        name: updateWebsiteDto.name,
        title: updateWebsiteDto.title,
        domain: updateWebsiteDto.domain,
        Block: {
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
        Block: true,
      },
    });
  }

  async remove(id: number, userId: number) {
    await this.prisma.website.delete({
      where: {
        id,
        Access: {
          some: {
            userId,
          },
        },
      },
    });
  }
}
