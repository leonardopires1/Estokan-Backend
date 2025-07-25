import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from '../database/prisma.module';

@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'your-secret-key',
            signOptions: { expiresIn: '48h' }, // 48 horas
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
