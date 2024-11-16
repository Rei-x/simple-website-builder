import { AbilityBuilder, type PureAbility } from "@casl/ability";
import {
  type PrismaQuery,
  type Subjects,
  createPrismaAbility,
} from "@casl/prisma";
import { Injectable } from "@nestjs/common";
import { type Member, Role, type User, type Website } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

export enum Action {
  Manage = "manage",
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

export type AppAbility = PureAbility<
  [
    Action,
    Subjects<{
      User: User;
      Website: Website;
      Member: Member;
    }>,
  ],
  PrismaQuery
>;

@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly prisma: PrismaService) {}

  async createForUser(user: { userId: number }) {
    const accessToWebsites = await this.prisma.member.findMany({
      where: {
        userId: user.userId,
      },
    });

    const adminWebsites = accessToWebsites
      .filter((m) => m.role === Role.ADMIN)
      .map((m) => m.websiteId);
    const allWebsites = accessToWebsites.map((m) => m.websiteId);

    const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

    can(Action.Manage, "User", { id: user.userId });

    can(Action.Read, "Website");
    can(Action.Create, "Website");

    can(Action.Manage, "Website", {
      id: {
        in: adminWebsites,
      },
    });

    can(Action.Update, "Website", {
      id: {
        in: allWebsites,
      },
    });

    can(Action.Manage, "Member", {
      websiteId: {
        in: adminWebsites,
      },
    });

    return build();
  }
}
