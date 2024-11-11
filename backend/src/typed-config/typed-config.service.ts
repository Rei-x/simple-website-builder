import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "src/env.validation";

@Injectable()
export class TypedConfigService {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  get<T extends keyof EnvironmentVariables>(key: T) {
    return this.configService.get(key) as EnvironmentVariables[T];
  }
}
