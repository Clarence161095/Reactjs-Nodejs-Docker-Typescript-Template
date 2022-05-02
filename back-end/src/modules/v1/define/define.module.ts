import { Module } from '@nestjs/common';
import { DefineService } from './define.service';
import { DefineController } from './define.controller';

@Module({
  controllers: [DefineController],
  providers: [DefineService]
})
export class DefineModule {}
