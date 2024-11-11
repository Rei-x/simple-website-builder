import { Request } from "express";

export interface RequestWithUser extends Request {
  user: UserPayload;
}

export type UserPayload = {
  userId: number;
  email: string;
};
