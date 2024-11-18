import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import type { Response } from "express";
import { TypedConfigService } from "src/typed-config/typed-config.service";
import { type User, UsersService } from "src/users/users.service";

import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { GoogleAuthGuard } from "./google.guard";
import { JwtAuthenticationGuard } from "./jwt.guard";
import { LocalAuthGuard } from "./local.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private typedConfigService: TypedConfigService,
  ) {}

  @Post("login")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    schema: {
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    },
  })
  @UseGuards(LocalAuthGuard)
  async login(@Body() login: LoginDto, @Res() res: Response) {
    const { token } = await this.authService.login(login.email);

    res.cookie("Authentication", token, {
      httpOnly: true,
      secure: this.typedConfigService.get("NODE_ENV") === "production",
      expires: new Date(
        Date.now() + this.typedConfigService.get("JWT_EXPIRATION_TIME") * 1000,
      ),
    });

    res.status(200).json({ message: "User logged in" });
  }

  @HttpCode(200)
  @ApiResponse({
    status: 200,
    schema: {
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    },
  })
  @UseGuards(JwtAuthenticationGuard)
  @Post("logout")
  async logout(@Res() res: Response) {
    return res
      .clearCookie("Authentication")
      .redirect(this.typedConfigService.get("FRONTEND_URL"));
  }

  @HttpCode(200)
  @ApiResponse({
    status: 200,
    schema: {
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    },
  })
  @Post("register")
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const user = await this.usersService.getByEmail(registerDto.email);

    if (user) {
      throw new ForbiddenException("User already exists");
    }

    const { token } = await this.authService.register({
      email: registerDto.email,
      password: registerDto.password,
    });

    res.cookie("Authentication", token, {
      httpOnly: true,
      secure: this.typedConfigService.get("NODE_ENV") === "production",
      expires: new Date(
        Date.now() + this.typedConfigService.get("JWT_EXPIRATION_TIME") * 1000,
      ),
    });

    res.status(200).json({ message: "User registered" });
  }

  @Get("google")
  @UseGuards(GoogleAuthGuard)
  loginGoogle() {}

  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  async googleCallback(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token } = await this.authService.login(user.email);

    res
      .cookie("Authentication", token, {
        httpOnly: true,
        secure: this.typedConfigService.get("NODE_ENV") === "production",
        expires: new Date(
          Date.now() +
            this.typedConfigService.get("JWT_EXPIRATION_TIME") * 1000,
        ),
      })
      .redirect(this.typedConfigService.get("FRONTEND_URL"));
  }
}
