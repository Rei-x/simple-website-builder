import { ValidationPipe, VersioningType } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import helmet from "helmet";
import { PrismaClientExceptionFilter } from "nestjs-prisma";

import { AppModule } from "./app.module";
import { TypedConfigService } from "./typed-config/typed-config.service";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.set("trust proxy", "loopback");
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: "*",
  });
  app.use(cookieParser());
  if (process.env.NODE_ENV === "development") {
    app.use(function (_req: any, _res: any, next: () => void) {
      setTimeout(next, 500);
    });
  }

  const config = new DocumentBuilder()
    .setTitle("Simple Website Builder API")
    .setVersion("1.0")
    .build();

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = app.get(TypedConfigService);

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, documentFactory);

  await app.listen(configService.get("PORT"));
}
bootstrap();
