import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiNotFoundResponse, ApiQuery } from "@nestjs/swagger";
import { CurrentUser } from "src/auth/current-user.decorator";
import { JwtAuthenticationGuard } from "src/auth/jwt.guard";
import { Public } from "src/auth/public.decorator";
import type { UserPayload } from "src/auth/request-with-user.interface";
import { NotFoundResponse } from "src/dto/NotFoundResponse.dto";

import { CreateWebsiteDto } from "./dto/create-website.dto";
import { UpdateWebsiteDto } from "./dto/update-website.dto";
import { WebsiteEntity } from "./entities/website.entity";
import { WebsiteService } from "./website.service";

@Controller("website")
@UseGuards(JwtAuthenticationGuard)
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  private logger = new Logger("WebsiteController");

  @Post()
  create(
    @Body() createWebsiteDto: CreateWebsiteDto,
    @CurrentUser() user: UserPayload,
  ): Promise<WebsiteEntity> {
    return this.websiteService.create(createWebsiteDto, user.userId);
  }

  @Public()
  @ApiQuery({
    name: "domain",
    required: false,
    type: "string",
    description: "Filter by domain",
  })
  @Get()
  findAll(
    @CurrentUser() user?: UserPayload,
    @Query("domain") domain?: string,
  ): Promise<WebsiteEntity[]> {
    console.log(user);
    if (!domain && !user) {
      throw new ForbiddenException("Specify domain or log in");
    }

    return this.websiteService.findUserWebsites({
      domain,
      userId: user?.userId,
    });
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @CurrentUser() user: UserPayload) {
    const website = await this.websiteService.findOne(+id, user.userId);

    if (!website) {
      throw new NotFoundException();
    }

    return website;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateWebsiteDto: UpdateWebsiteDto,
    @CurrentUser() user: UserPayload,
  ) {
    await this.websiteService.update(+id, user.userId, updateWebsiteDto);

    return this.websiteService.findOne(+id, user.userId);
  }

  @ApiNotFoundResponse({
    type: NotFoundResponse,
  })
  @Delete(":id")
  async remove(@Param("id") id: string, @CurrentUser() user: UserPayload) {
    const website = await this.websiteService.findOne(+id, user.userId);

    if (!website) {
      throw new NotFoundException();
    }

    await this.websiteService.remove(+id, user.userId);

    return website;
  }
}
