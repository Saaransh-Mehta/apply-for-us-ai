import { Test, TestingModule } from '@nestjs/testing';
import { AiengineService } from './aiengine.service';

describe('AiengineService', () => {
  let service: AiengineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiengineService],
    }).compile();

    service = module.get<AiengineService>(AiengineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
