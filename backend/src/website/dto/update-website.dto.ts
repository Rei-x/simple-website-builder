import { PartialType } from "@nestjs/swagger";

import type { CreateBlockDto } from "./create-block.dto";
import { CreateWebsiteDto } from "./create-website.dto";

export class UpdateWebsiteDto extends PartialType(CreateWebsiteDto) {
  domain?: string;
  blocks: CreateBlockDto[];
}
