import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  SetMetadata,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

import { AppAbility, CaslAbilityFactory } from "./casl-ability.factory";

type PolicyHandlerCallback = (options: {
  ability: AppAbility;
  req: Request;
  getSubject: typeof CaslAbilityFactory.prototype.getSubject;
}) => boolean | Promise<boolean>;

interface IPolicyHandler {
  handle: PolicyHandlerCallback;
}

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

export const CHECK_POLICIES_KEY = "check_policy";
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getClass(),
      ) ||
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) ||
      [];

    const req = context.switchToHttp().getRequest<Request>();

    const ability = await this.caslAbilityFactory.createForUser({
      userId: req.user.userId,
    });

    return policyHandlers.every(async (handler) =>
      this.execPolicyHandler(handler, ability, req),
    );
  }

  private execPolicyHandler(
    handler: PolicyHandler,
    ability: AppAbility,
    req: Request,
  ) {
    if (typeof handler === "function") {
      return handler({
        ability,
        req,
        getSubject: this.caslAbilityFactory.getSubject.bind(
          this.caslAbilityFactory,
        ),
      });
    }
    return handler.handle({
      ability,
      req,
      getSubject: this.caslAbilityFactory.getSubject.bind(
        this.caslAbilityFactory,
      ),
    });
  }
}
