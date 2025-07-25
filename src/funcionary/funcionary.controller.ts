import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FuncionaryService } from './funcionary.service';
import { CreateFuncionaryDto } from './dto/create-funcionary.dto';
import { UpdateFuncionaryDto } from './dto/update-funcionary.dto';
import { FindFuncionaryDto } from './dto/find-funcionary.dto';
import { FuncionaryResponseDto } from './dto/funcionary-response.dto';
import { AssignWorkDto } from './dto/assign-work.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import AssignEquipamentsDto from './dto/assign-equipaments.dto';


@ApiTags('functionaries')
@Controller('funcionary')
@UseGuards(JwtAuthGuard) // Proteger todo o controller
@ApiBearerAuth() // Documentar que precisa de autenticação
export class FuncionaryController {
  constructor(private readonly funcionaryService: FuncionaryService) {}

  
  @Post()
  @ApiOperation({ summary: 'Criar um novo funcionário' })
  @ApiResponse({ status: 201, description: 'Funcionário criado com sucesso.', type: FuncionaryResponseDto })
  @Public()
  create(@Body() createFuncionaryDto: CreateFuncionaryDto): Promise<FuncionaryResponseDto> {
    return this.funcionaryService.create(createFuncionaryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os funcionários' })
  @ApiResponse({ status: 200, description: 'Lista de funcionários.', type: [FuncionaryResponseDto] })
  findAll(): Promise<FuncionaryResponseDto[]> {
    return this.funcionaryService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar funcionário por ID, CPF, email ou obra' })
  @ApiResponse({ status: 200, description: 'Funcionários encontrados.', type: [FuncionaryResponseDto] })
  findBy(@Query() findFuncionaryDto: FindFuncionaryDto): Promise<FuncionaryResponseDto[]> {
    return this.funcionaryService.findBy(findFuncionaryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar funcionário por ID' })
  @ApiResponse({ status: 200, description: 'Funcionário encontrado.', type: FuncionaryResponseDto })
  findOne(@Param('id') id: string): Promise<FuncionaryResponseDto | null> {
    return this.funcionaryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar funcionário' })
  @ApiResponse({ status: 200, description: 'Funcionário atualizado.', type: FuncionaryResponseDto })
  update(@Param('id') id: string, @Body() updateFuncionaryDto: UpdateFuncionaryDto): Promise<FuncionaryResponseDto> {
    return this.funcionaryService.update(+id, updateFuncionaryDto);
  }

  @Patch(':id/assign-work')
  @ApiOperation({ summary: 'Atualizar obra associada ao funcionário' })
  @ApiResponse({ status: 200, description: 'Obra associada ao funcionário.', type: FuncionaryResponseDto })
  assignWork(@Param('id') id: string, @Body() assignWorkDto: AssignWorkDto): Promise<FuncionaryResponseDto> {
    return this.funcionaryService.assignWork(+id, assignWorkDto.workId ?? null);
  }

  @Patch(':id/assign-equipaments')
  @ApiOperation({ summary: 'Atualizar equipamentos associados ao funcionário' })
  @ApiResponse({ status: 200, description: 'Equipamentos associados ao funcionário.', type: FuncionaryResponseDto })
  assignEquipament(@Param('id') id: string, @Body() assignEquipamentsDto: AssignEquipamentsDto): Promise<FuncionaryResponseDto> {
    return this.funcionaryService.assignEquipaments(+id, assignEquipamentsDto.equipamentIds ?? []);
  }

  @Patch(':id/transfer-work')
  @ApiOperation({ summary: 'Transferir obra associada ao funcionário' })
  @ApiResponse({ status: 200, description: 'Obra transferida com sucesso.', type: FuncionaryResponseDto })
  transferWork(@Param('id') id: string, @Body() assignWorkDto: AssignWorkDto): Promise<FuncionaryResponseDto> {
    return this.funcionaryService.assignWork(+id, assignWorkDto.workId ?? null);
  }

  @Patch(':id/unassign-equipaments')
  @ApiOperation({ summary: 'Desassociar equipamentos do funcionário' })
  @ApiResponse({ status: 200, description: 'Equipamentos desassociados do funcionário.', type: FuncionaryResponseDto })
  unassignEquipaments(@Param('id') id: string, @Body() assignEquipamentsDto: AssignEquipamentsDto): Promise<FuncionaryResponseDto> {
    return this.funcionaryService.unassignEquipaments(+id, assignEquipamentsDto.equipamentIds ?? []);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar funcionário' })
  @ApiResponse({ status: 200, description: 'Funcionário deletado.', type: FuncionaryResponseDto })
  remove(@Param('id') id: string): Promise<FuncionaryResponseDto> {
    return this.funcionaryService.remove(+id);
  }
}
