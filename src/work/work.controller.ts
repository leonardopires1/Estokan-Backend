import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { FindWorkDto } from './dto/find-work.dto';
import { WorkResponseDto } from './dto/work-response.dto';
import { AssignClientToWorkDto } from './dto/assign-client-to-work.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import AssignEquipamentToWorkDto from './dto/assign-equipament-to-work.dto';

@ApiTags('works')
@Controller('work')
@UseGuards(JwtAuthGuard) // Proteger todo o controller
@ApiBearerAuth() // Documentar que precisa de autenticação
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @ApiOperation({ summary: 'Criar uma nova obra' })
  @ApiResponse({ status: 201, description: 'Obra criada com sucesso.', type: WorkResponseDto })
  @Post()
  create(@Body() createWorkDto: CreateWorkDto): Promise<WorkResponseDto> {
    return this.workService.create(createWorkDto);
  }

  @ApiOperation({ summary: 'Listar todas as obras' })
  @ApiResponse({ status: 200, description: 'Lista de obras.', type: [WorkResponseDto] })
  @Get()
  findAll(): Promise<WorkResponseDto[]> {
    return this.workService.findAll();
  }

  @ApiOperation({ summary: 'Buscar obra por ID, CPF do proprietário ou título' })
  @ApiResponse({ status: 200, description: 'Obra encontrada.', type: WorkResponseDto })
  @Get('search')
  findBy(@Query() findWorkDto: FindWorkDto): Promise<WorkResponseDto | null> {
    return this.workService.findBy(findWorkDto);
  }

  @ApiOperation({ summary: 'Buscar uma obra por ID' })
  @ApiResponse({ status: 200, description: 'Obra encontrada.', type: WorkResponseDto })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<WorkResponseDto | null> {
    return this.workService.findOne(+id);
  }

  @ApiOperation({ summary: 'Atualizar uma obra' })
  @ApiResponse({ status: 200, description: 'Obra atualizada com sucesso.', type: WorkResponseDto })
  @ApiResponse({ status: 404, description: 'Obra não encontrada.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkDto: UpdateWorkDto): Promise<WorkResponseDto> {
    return this.workService.update(+id, updateWorkDto);
  }

  @ApiOperation({ summary: 'Alterar o proprietário de uma obra existente' })
  @ApiResponse({ status: 200, description: 'Obra transferida para o novo cliente.', type: WorkResponseDto })
  @ApiResponse({ status: 404, description: 'Obra ou cliente não encontrado.' })
  @Patch(':id/assign-client')
  assignClient(@Param('id') id: string, @Body() assignClientDto: AssignClientToWorkDto): Promise<WorkResponseDto> {
    return this.workService.assignClient(+id, assignClientDto.clientCpf);
  }

  @ApiOperation({ summary: 'Associar um equipamento a uma obra' })
  @ApiResponse({ status: 200, description: 'Equipamento associado à obra.', type: WorkResponseDto })
  @ApiResponse({ status: 404, description: 'Obra ou equipamento não encontrado.' })
  @Patch(':id/assign-equipament')
  assignEquipament(@Param('id') id: string, @Body() assignEquipamentDto: AssignEquipamentToWorkDto): Promise<WorkResponseDto> {
    return this.workService.assignEquipament(+id, assignEquipamentDto.equipamentId);
  }

  @ApiOperation({ summary: 'Desassociar um equipamento de uma obra' })
  @ApiResponse({ status: 200, description: 'Equipamento desassociado da obra.', type: WorkResponseDto })
  @ApiResponse({ status: 404, description: 'Obra ou equipamento não encontrado.' })
  @Patch(':id/unassign-equipament')
  unassignEquipament(@Param('id') id: string, @Body() unassignEquipamentDto: AssignEquipamentToWorkDto): Promise<WorkResponseDto> {
    return this.workService.unassignEquipament(+id, unassignEquipamentDto.equipamentId);
  }

  @ApiOperation({ summary: 'Associar um funcionário a uma obra' })
  @ApiResponse({ status: 200, description: 'Funcionário associado à obra.', type: WorkResponseDto })
  @ApiResponse({ status: 404, description: 'Obra ou funcionário não encontrado.' })
  @Patch(':id/assign-functionary')
  assignFunctionary(@Param('id') id: string, @Body() assignFunctionaryDto: { functionaryCpf: string }): Promise<WorkResponseDto> {
    return this.workService.assignFunctionary(+id, assignFunctionaryDto.functionaryCpf);
  }

  @ApiOperation({ summary: 'Desassociar um funcionário de uma obra' })
  @ApiResponse({ status: 200, description: 'Funcionário desassociado da obra.', type: WorkResponseDto })
  @ApiResponse({ status: 404, description: 'Obra ou funcionário não encontrado.' })
  @Patch(':id/unassign-functionary')
  unassignFunctionary(@Param('id') id: string, @Body() unassignFunctionaryDto: { functionaryCpf: string }): Promise<WorkResponseDto> {
    return this.workService.unassignFunctionary(+id, unassignFunctionaryDto.functionaryCpf);
  }

  @ApiOperation({ summary: 'Deletar uma obra' })
  @ApiResponse({ status: 200, description: 'Obra deletada com sucesso.', type: WorkResponseDto })
  @ApiResponse({ status: 404, description: 'Obra não encontrada.' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<WorkResponseDto> {
    return this.workService.remove(+id);
  }
}
