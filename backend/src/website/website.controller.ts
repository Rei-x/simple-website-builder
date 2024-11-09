import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

import { CreateWebsiteDto } from "./dto/create-website.dto";
import { UpdateWebsiteDto } from "./dto/update-website.dto";
import { WebsiteEntity } from "./entities/website.entity";
import { WebsiteService } from "./website.service";

@Controller("website")
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  private logger = new Logger("WebsiteController");

  @Post()
  create(@Body() createWebsiteDto: CreateWebsiteDto): Promise<WebsiteEntity> {
    return this.websiteService.create(createWebsiteDto);
  }

  @ApiQuery({
    name: "domain",
    required: false,
    type: "string",
    description: "Filter by domain",
  })
  @Get()
  findAll(@Query("domain") domain?: string): Promise<WebsiteEntity[]> {
    return this.websiteService.findUserWebsites({
      domain,
    });
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const website = await this.websiteService.findOne(+id);

    if (!website) {
      throw new NotFoundException();
    }

    return website;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateWebsiteDto: UpdateWebsiteDto,
  ) {
    await this.websiteService.update(+id, updateWebsiteDto);

    return this.websiteService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.websiteService.remove(+id);
  }
}
