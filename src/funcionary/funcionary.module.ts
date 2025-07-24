import { Module } from '@nestjs/common';
import { FuncionaryService } from './funcionary.service';
import { FuncionaryController } from './funcionary.controller';

@Module({
  controllers: [FuncionaryController],
  providers: [FuncionaryService],
})
export class FuncionaryModule {}
