import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { FindWorkDto } from './dto/find-work.dto';
import { WorkResponseDto } from './dto/work-response.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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

  @ApiOperation({ summary: 'Deletar uma obra' })
  @ApiResponse({ status: 200, description: 'Obra deletada com sucesso.', type: WorkResponseDto })
  @ApiResponse({ status: 404, description: 'Obra não encontrada.' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<WorkResponseDto> {
    return this.workService.remove(+id);
  }
}
