import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { TypedConfigService } from "src/typed-config/typed-config.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private typedConfigService: TypedConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: typedConfigService.get("GOOGLE_AUTH_CLIENT_ID"),
      clientSecret: typedConfigService.get("GOOGLE_AUTH_CLIENT_SECRET"),
      callbackURL: typedConfigService.get("GOOGLE_AUTH_REDIRECT_URI"),
      scope: ["profile", "email"],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any) {
    const email = profile.emails[0]?.value;

    if (typeof email !== "string") {
      throw new Error("Email not provided from Google");
    }

    const user = await this.usersService.getByEmail(email);

    if (user) {
      return user;
    }

    return this.usersService.create({
      email,
      displayName: profile.displayName,
    });
  }
}
