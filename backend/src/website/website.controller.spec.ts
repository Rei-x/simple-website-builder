import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "nestjs-prisma";

import { WebsiteController } from "./website.controller";
import { WebsiteService } from "./website.service";

describe("WebsiteController", () => {
  let controller: WebsiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebsiteController],
      providers: [WebsiteService, PrismaService],
    }).compile();

    controller = module.get<WebsiteController>(WebsiteController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();

    controller.findAll();
  });
});
