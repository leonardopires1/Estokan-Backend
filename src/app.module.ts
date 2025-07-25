import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { FuncionaryModule } from './funcionary/funcionary.module';
import { PrismaModule } from './database/prisma.module';
import { WorkModule } from './work/work.module';
import { EquipamentsModule } from './equipaments/equipaments.module';
import { SupplierModule } from './supplier/supplier.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, ClientModule, FuncionaryModule, WorkModule, EquipamentsModule, SupplierModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
