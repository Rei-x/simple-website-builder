import { ApiProperty } from "@nestjs/swagger";

export class CreateBlockDto {
  id: string;
  type: string;
  @ApiProperty({ type: () => "{}" })
  props: Record<string, any>;
}
