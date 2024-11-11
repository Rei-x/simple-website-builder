import { Test, TestingModule } from '@nestjs/testing';
import { TypedConfigService } from './typed-config.service';

describe('TypedConfigService', () => {
  let service: TypedConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypedConfigService],
    }).compile();

    service = module.get<TypedConfigService>(TypedConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
