import { Test, TestingModule } from '@nestjs/testing';
import { AiengineController } from './aiengine.controller';

describe('AiengineController', () => {
  let controller: AiengineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiengineController],
    }).compile();

    controller = module.get<AiengineController>(AiengineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
