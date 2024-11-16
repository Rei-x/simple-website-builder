import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

import type { UserPayload } from "./request-with-user.interface";

declare module "express" {
  interface Request {
    user: UserPayload;
  }
}

const getCurrentUserByContext = (context: ExecutionContext) =>
  context.switchToHttp().getRequest<Request>().user;

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
