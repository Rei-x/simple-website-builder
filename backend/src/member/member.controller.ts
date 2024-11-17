import { subject } from "@casl/ability";
import {
  BadRequestException,
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
import { CurrentUser } from "src/auth/current-user.decorator";
import { JwtAuthenticationGuard } from "src/auth/jwt.guard";
import type { UserPayload } from "src/auth/request-with-user.interface";
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
@UseGuards(JwtAuthenticationGuard)
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly casl: CaslAbilityFactory,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies(({ ability, req }) => {
    return ability.can(
      Action.Create,
      subject("Member", {
        websiteId: +req.params.websiteId,
      } as Member),
    );
  })
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

  @UseGuards(PoliciesGuard)
  @CheckPolicies(({ ability, req }) => {
    return ability.can(
      Action.Read,
      subject("Member", {
        websiteId: +req.params.websiteId,
      } as Member),
    );
  })
  @Get()
  findAll(@Param("websiteId") websiteId: string) {
    return this.memberService.findAll(+websiteId);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(({ ability, req }) => {
    return ability.can(
      Action.Read,
      subject("Member", {
        websiteId: +req.params.websiteId,
      } as Member),
    );
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.memberService.findOne(+id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @CurrentUser() user: UserPayload,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    const ability = await this.casl.createForUser(user);

    if (updateMemberDto.role) {
      if (
        ability.can(
          Action.Update,
          subject("Member", await this.memberService.findOne(+id)),
          "role",
        )
      )
        return this.memberService.updateRole(+id, updateMemberDto.role);
    }

    if (updateMemberDto.hasAcceptedInvite) {
      if (
        ability.can(
          Action.Update,
          subject("Member", await this.memberService.findOne(+id)),
          "hasAcceptedInvite",
        )
      )
        return this.memberService.updateInviteStatus(
          +id,
          updateMemberDto.hasAcceptedInvite,
        );
    }

    throw new BadRequestException("Invalid update");
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(async ({ ability, req, getSubject }) => {
    return ability.can(
      Action.Delete,
      subject("Member", (await getSubject("Member", +req.params.id)) as Member),
    );
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.memberService.remove(+id);
  }
}
