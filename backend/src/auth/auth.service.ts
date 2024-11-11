import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { TypedConfigService } from "src/typed-config/typed-config.service";

import { type User, UsersService } from "../users/users.service";

export interface JwtPayload {
  email: string;
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private typedConfigService: TypedConfigService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, "password"> | null> {
    const user = await this.usersService.getByEmail(email);

    if (!user || !user.password) {
      throw new Error("User not found");
    }

    if (await argon2.verify(user.password, pass)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string) {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const payload = { sub: user.id, email: user.email };

    return {
      token: await this.getTokenForPayload(payload),
    };
  }

  async register({ email, password }: { email: string; password: string }) {
    const user = await this.usersService.create({
      email,
      password,
    });
    const payload = { sub: user.id, email: user.email };

    return {
      token: await this.getTokenForPayload(payload),
    };
  }

  private async getTokenForPayload(payload: JwtPayload) {
    return await this.jwtService.signAsync(payload, {
      secret: this.typedConfigService.get("JWT_SECRET"),
    });
  }
}
