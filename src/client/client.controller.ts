import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { FindClientDto } from './dto/find-client.dto';
import { ClientResponseDto } from './dto/client-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('clients')
@Controller('client')
@UseGuards(JwtAuthGuard) // Proteger todo o controller
@ApiBearerAuth() // Documentar que precisa de autenticação
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Criar um novo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso.', type: ClientResponseDto })
  create(@Body() CreateClientDto: CreateClientDto): Promise<ClientResponseDto> {
    return this.clientService.create(CreateClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes.', type: [ClientResponseDto] })
  findAll(): Promise<ClientResponseDto[]> {
    return this.clientService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar cliente por ID, CPF ou email' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado.', type: ClientResponseDto })
  findBy(@Query() FindClientDto: FindClientDto): Promise<ClientResponseDto | null> {
    return this.clientService.findBy(FindClientDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado.', type: ClientResponseDto })
  findOne(@Param('id') id: string): Promise<ClientResponseDto | null> {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar cliente' })
  @ApiResponse({ status: 200, description: 'Cliente atualizado.', type: ClientResponseDto })
  update(@Param('id') id: string, @Body() UpdateClientDto: UpdateClientDto): Promise<ClientResponseDto> {
    return this.clientService.update(+id, UpdateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar cliente' })
  @ApiResponse({ status: 200, description: 'Cliente deletado.', type: ClientResponseDto })
  remove(@Param('id') id: string): Promise<ClientResponseDto> {
    return this.clientService.remove(+id);
  }
}
