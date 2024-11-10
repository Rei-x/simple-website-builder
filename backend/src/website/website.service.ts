import { Injectable } from "@nestjs/common";
import type { JsonValue } from "@prisma/client/runtime/library";
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
  async create(createWebsiteDto: CreateWebsiteDto) {
    const { Block: blocks, ...website } = await this.prisma.website.create({
      data: {
        domain: randomDomain(),
        name: createWebsiteDto.name,
        title: createWebsiteDto.title ?? "Moja strona",
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

  findAll() {
    return this.prisma.website.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  async findUserWebsites(options?: {
    domain?: string;
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
      where: options,
    });

    return websites.map((website) => ({
      ...website,
      blocks: website.Block,
    }));
  }

  async findOne(id: number): Promise<WebsiteEntity | null> {
    const website = await this.prisma.website.findUnique({
      where: { id },
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

  async update(id: number, updateWebsiteDto: UpdateWebsiteDto) {
    await this.prisma.website.update({
      where: { id },
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
              props: block.props as JsonValue,
            })),
          },
        },
      },
      include: {
        Block: true,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.website.delete({
      where: { id },
    });
  }
}
