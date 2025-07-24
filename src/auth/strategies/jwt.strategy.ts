import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
        });
    }

    async validate(payload: any) {
        // Buscar o funcionário no banco para garantir que ainda existe
        const functionary = await this.prisma.funcionary.findUnique({
            where: { id: payload.sub },
            select: {
                id: true,
                cpf: true,
                name: true,
                email: true,
                workId: true,
            }
        });

        if (!functionary) {
            return null;
        }

        return {
            userId: payload.sub,
            ...functionary
        };
    }
}
