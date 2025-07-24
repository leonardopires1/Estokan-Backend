import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FuncionaryService } from './funcionary.service';
import { CreateFuncionaryDto } from './dto/create-funcionary.dto';
import { UpdateFuncionaryDto } from './dto/update-funcionary.dto';
import { FindFuncionaryDto } from './dto/find-funcionary.dto';
import { FuncionaryResponseDto } from './dto/funcionary-response.dto';

@ApiTags('functionaries')
@Controller('funcionary')
export class FuncionaryController {
  constructor(private readonly funcionaryService: FuncionaryService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo funcionário' })
  @ApiResponse({ status: 201, description: 'Funcionário criado com sucesso.', type: FuncionaryResponseDto })
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

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar funcionário' })
  @ApiResponse({ status: 200, description: 'Funcionário deletado.', type: FuncionaryResponseDto })
  remove(@Param('id') id: string): Promise<FuncionaryResponseDto> {
    return this.funcionaryService.remove(+id);
  }
}
