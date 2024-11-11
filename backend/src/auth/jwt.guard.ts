import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthenticationGuard extends AuthGuard("jwt") {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  // @ts-expect-error ???
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      "isPublic",
      context.getHandler(),
    );

    try {
      const canActivate = await super.canActivate(context);

      if (isPublic) {
        return true;
      }

      return canActivate;
    } catch (error) {
      if (isPublic) {
        return true;
      }

      throw error;
    }
  }
}
