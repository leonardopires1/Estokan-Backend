import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { FuncionaryModule } from '../funcionary/funcionary.module';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [FuncionaryModule],
})
export class ClientModule {}
