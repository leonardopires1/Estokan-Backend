import { 
    Controller, 
    Post, 
    Body, 
    UseGuards, 
    Request, 
    Get,
    ValidationPipe 
} from '@nestjs/common';
import { 
    ApiTags, 
    ApiOperation, 
    ApiResponse, 
    ApiBody,
    ApiBearerAuth 
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ summary: 'Login de funcionário' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ 
        status: 200, 
        description: 'Login realizado com sucesso', 
        type: AuthResponseDto 
    })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<AuthResponseDto> {
        return this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obter perfil do funcionário autenticado' })
    @ApiResponse({ 
        status: 200, 
        description: 'Perfil do funcionário',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                cpf: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
                workId: { type: 'number', nullable: true },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
                work: {
                    type: 'object',
                    nullable: true,
                    properties: {
                        id: { type: 'number' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        ownerCpf: { type: 'string' }
                    }
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Token inválido ou expirado' })
    async getProfile(@Request() req) {
        return this.authService.getProfile(req.user.userId);
    }
}
