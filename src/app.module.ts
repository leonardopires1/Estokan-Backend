import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FuncionaryModule } from './funcionary/funcionary.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, UserModule, FuncionaryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
