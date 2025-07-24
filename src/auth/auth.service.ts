import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../database/prisma.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const functionary = await this.prisma.funcionary.findUnique({
            where: { email },
            select: {
                id: true,
                cpf: true,
                name: true,
                email: true,
                password: true,
                workId: true,
            }
        });

        if (functionary && await bcrypt.compare(password, functionary.password)) {
            const { password, ...result } = functionary;
            return result;
        }
        
        return null;
    }

    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        
        if (!user) {
            throw new UnauthorizedException('Email ou senha incorretos');
        }

        const payload = { 
            email: user.email, 
            sub: user.id,
            name: user.name,
            cpf: user.cpf
        };

        const access_token = this.jwtService.sign(payload);

        return {
            access_token,
            token_type: 'Bearer',
            expires_in: 3600, // 1 hora
            user: {
                id: user.id,
                cpf: user.cpf,
                name: user.name,
                email: user.email,
                workId: user.workId
            }
        };
    }

    async getProfile(userId: number) {
        const functionary = await this.prisma.funcionary.findUnique({
            where: { id: userId },
            select: {
                id: true,
                cpf: true,
                name: true,
                email: true,
                workId: true,
                createdAt: true,
                updatedAt: true,
                work: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        ownerCpf: true
                    }
                }
            }
        });

        if (!functionary) {
            throw new UnauthorizedException('Usuário não encontrado');
        }

        return functionary;
    }

    // Função auxiliar para hash de senhas (para uso futuro)
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
}
