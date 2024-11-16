import { subject } from "@casl/ability";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiNotFoundResponse, ApiParam } from "@nestjs/swagger";
import { Member } from "@prisma/client";
import { JwtAuthenticationGuard } from "src/auth/jwt.guard";
import { Action, CaslAbilityFactory } from "src/casl/casl-ability.factory";
import { CheckPolicies, PoliciesGuard } from "src/casl/policies.guard";
import { NotFoundResponse } from "src/dto/NotFoundResponse.dto";

import { CreateMemberDto } from "./dto/create-member.dto";
import { UpdateMemberDto } from "./dto/update-member.dto";
import { MemberService } from "./member.service";

@ApiParam({
  name: "websiteId",
  description: "Website ID",
  type: "string",
})
@Controller("website/:websiteId/member")
@UseGuards(PoliciesGuard)
@CheckPolicies((ability, req) => {
  return ability.can(
    Action.Manage,
    subject("Member", {
      websiteId: +req.params.websiteId,
    } as Member),
  );
})
@UseGuards(JwtAuthenticationGuard)
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly casl: CaslAbilityFactory,
  ) {}

  @ApiNotFoundResponse({
    description: "Member doesn't have an account",
    type: NotFoundResponse,
  })
  @Post()
  async create(
    @Body() createMemberDto: CreateMemberDto,
    @Param("websiteId") websiteId: string,
  ) {
    return this.memberService.create(+websiteId, createMemberDto);
  }

  @Get()
  findAll(@Param("websiteId") websiteId: string) {
    return this.memberService.findAll(+websiteId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.memberService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.memberService.remove(+id);
  }
}
