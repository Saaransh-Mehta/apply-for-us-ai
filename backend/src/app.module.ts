import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AiengineModule } from './aiengine/aiengine.module';
import { ParserModule } from './parser/parser.module';

@Module({
  imports: [UsersModule, AiengineModule, ParserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
