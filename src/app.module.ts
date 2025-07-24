import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FuncionaryModule } from './funcionary/funcionary.module';
import { PrismaModule } from './database/prisma.module';
import { WorkModule } from './work/work.module';
import { EquipamentsModule } from './equipaments/equipaments.module';
import { SupplierModule } from './supplier/supplier.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, FuncionaryModule, WorkModule, EquipamentsModule, SupplierModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
