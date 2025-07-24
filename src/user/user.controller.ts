import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('user')
@UseGuards(JwtAuthGuard) // Proteger todo o controller
@ApiBearerAuth() // Documentar que precisa de autenticação
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.', type: UserResponseDto })
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários.', type: [UserResponseDto] })
  findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar usuário por ID, CPF ou email' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.', type: UserResponseDto })
  findBy(@Query() findUserDto: FindUserDto): Promise<UserResponseDto | null> {
    return this.userService.findBy(findUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.', type: UserResponseDto })
  findOne(@Param('id') id: string): Promise<UserResponseDto | null> {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado.', type: UserResponseDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar usuário' })
  @ApiResponse({ status: 200, description: 'Usuário deletado.', type: UserResponseDto })
  remove(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.remove(+id);
  }
}
