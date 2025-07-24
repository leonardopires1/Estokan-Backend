import { Module } from '@nestjs/common';
import { EquipamentsService } from './equipaments.service';
import { EquipamentsController } from './equipaments.controller';

@Module({
  controllers: [EquipamentsController],
  providers: [EquipamentsService],
})
export class EquipamentsModule {}
