import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "nestjs-prisma";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CaslModule } from "./casl/casl.module";
import { validate } from "./env.validation";
import { LoggerMiddleware } from "./logger.middleware";
import { MemberModule } from "./member/member.module";
import { TypedConfigModule } from "./typed-config/typed-config.module";
import { TypedConfigService } from "./typed-config/typed-config.service";
import { UsersModule } from "./users/users.module";
import { WebsiteModule } from "./website/website.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    WebsiteModule,
    AuthModule,
    UsersModule,
    TypedConfigModule,
    JwtModule.registerAsync({
      imports: [TypedConfigModule],
      inject: [TypedConfigService],
      useFactory: async (typedConfigService: TypedConfigService) => ({
        secret: typedConfigService.get("JWT_SECRET"),
        signOptions: {
          expiresIn: `${typedConfigService.get("JWT_EXPIRATION_TIME")}s`,
        },
      }),
    }),
    MemberModule,
    CaslModule,
    PrismaModule.forRoot({
      prismaServiceOptions: {
        prismaOptions: {
          omit: {
            user: {
              password: true,
            },
          },
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TypedConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
