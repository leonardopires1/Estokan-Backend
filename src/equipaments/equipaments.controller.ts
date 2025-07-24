import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EquipamentsService } from './equipaments.service';
import { CreateEquipamentDto } from './dto/create-equipament.dto';
import { UpdateEquipamentDto } from './dto/update-equipament.dto';
import { FindEquipamentDto } from './dto/find-equipament.dto';
import { EquipamentResponseDto } from './dto/equipament-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('equipaments')
@Controller('equipaments')
@UseGuards(JwtAuthGuard) // Proteger todo o controller
@ApiBearerAuth() // Documentar que precisa de autenticação
export class EquipamentsController {
  constructor(private readonly equipamentsService: EquipamentsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo equipamento' })
  @ApiResponse({ status: 201, description: 'Equipamento criado com sucesso.', type: EquipamentResponseDto })
  create(@Body() createEquipamentDto: CreateEquipamentDto): Promise<EquipamentResponseDto> {
    return this.equipamentsService.create(createEquipamentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os equipamentos' })
  @ApiResponse({ status: 200, description: 'Lista de equipamentos.', type: [EquipamentResponseDto] })
  findAll(): Promise<EquipamentResponseDto[]> {
    return this.equipamentsService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar equipamentos por critérios específicos' })
  @ApiResponse({ status: 200, description: 'Equipamentos encontrados.', type: [EquipamentResponseDto] })
  findBy(@Query() findEquipamentDto: FindEquipamentDto): Promise<EquipamentResponseDto[]> {
    return this.equipamentsService.findBy(findEquipamentDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar equipamento por ID' })
  @ApiResponse({ status: 200, description: 'Equipamento encontrado.', type: EquipamentResponseDto })
  findOne(@Param('id') id: string): Promise<EquipamentResponseDto | null> {
    return this.equipamentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar equipamento' })
  @ApiResponse({ status: 200, description: 'Equipamento atualizado.', type: EquipamentResponseDto })
  update(@Param('id') id: string, @Body() updateEquipamentDto: UpdateEquipamentDto): Promise<EquipamentResponseDto> {
    return this.equipamentsService.update(+id, updateEquipamentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar equipamento' })
  @ApiResponse({ status: 200, description: 'Equipamento deletado.', type: EquipamentResponseDto })
  remove(@Param('id') id: string): Promise<EquipamentResponseDto> {
    return this.equipamentsService.remove(+id);
  }
}
