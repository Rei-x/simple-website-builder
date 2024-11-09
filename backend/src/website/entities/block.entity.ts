import { ApiProperty } from "@nestjs/swagger";
import { Block } from "@prisma/client";
import type { JsonValue } from "@prisma/client/runtime/library";

export class BlockEntity implements Block {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  websiteId: number;
  order: number;
  type: string;
  @ApiProperty({ type: "object", properties: {} })
  props: JsonValue;
}
