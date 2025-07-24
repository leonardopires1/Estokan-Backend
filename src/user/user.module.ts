import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FuncionaryModule } from '../funcionary/funcionary.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [FuncionaryModule],
})
export class UserModule {}
