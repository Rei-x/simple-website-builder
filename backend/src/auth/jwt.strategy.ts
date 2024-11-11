import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TypedConfigService } from "src/typed-config/typed-config.service";

import type { JwtPayload } from "./auth.service";
import type { UserPayload } from "./request-with-user.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private typedConfig: TypedConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: typedConfig.get("JWT_SECRET"),
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email } satisfies UserPayload;
  }
}
