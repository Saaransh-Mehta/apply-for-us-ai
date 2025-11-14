import { Module } from '@nestjs/common';
import { AiengineController } from './aiengine.controller';
// import { AiengineService } from './aiengine.service';

@Module({
  controllers: [AiengineController],
  providers: []
})
export class AiengineModule {}
