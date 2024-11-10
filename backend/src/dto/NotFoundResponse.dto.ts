import { ApiProperty } from "@nestjs/swagger";

export class NotFoundResponse {
  @ApiProperty({ type: "number", enum: [404] })
  statusCode: 404;
  message: "Resource not found";
}
