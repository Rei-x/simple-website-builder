import { Website } from "@prisma/client";
import { Transform } from "class-transformer";

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
}
