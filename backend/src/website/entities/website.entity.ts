import { Website } from "@prisma/client";
import { Transform } from "class-transformer";
import type { MemberEntity } from "src/member/entities/member.entity";

import { BlockEntity } from "./block.entity";

export class WebsiteEntity implements Website {
  id: number;
  name: string;

  domain: string;
  title: string;

  @Transform(({ value }) => value.toISOString())
  createdAt: Date;

  @Transform(({ value }) => value.toISOString())
  updatedAt: Date;
  blocks: Array<BlockEntity>;
  member?: MemberEntity;
}
