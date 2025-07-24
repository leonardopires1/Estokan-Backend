import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query,
  ParseIntPipe,
  ValidationPipe,
  UseGuards 
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiQuery,
  ApiBody,
  ApiBearerAuth 
} from '@nestjs/swagger';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { FindSupplierDto } from './dto/find-supplier.dto';
import { SupplierResponseDto } from './dto/supplier-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Suppliers')
@Controller('supplier')
@UseGuards(JwtAuthGuard) // Proteger todo o controller
@ApiBearerAuth() // Documentar que precisa de autenticação
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo fornecedor' })
  @ApiBody({ type: CreateSupplierDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Fornecedor criado com sucesso', 
    type: SupplierResponseDto 
  })
  @ApiResponse({ status: 409, description: 'CNPJ ou email já cadastrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body(ValidationPipe) createSupplierDto: CreateSupplierDto): Promise<SupplierResponseDto> {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os fornecedores' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de fornecedores', 
    type: [SupplierResponseDto] 
  })
  findAll(): Promise<SupplierResponseDto[]> {
    return this.supplierService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar fornecedores por critérios' })
  @ApiQuery({ name: 'id', required: false, description: 'ID do fornecedor' })
  @ApiQuery({ name: 'cnpj', required: false, description: 'CNPJ do fornecedor' })
  @ApiQuery({ name: 'name', required: false, description: 'Nome do fornecedor (busca parcial)' })
  @ApiQuery({ name: 'email', required: false, description: 'Email do fornecedor' })
  @ApiQuery({ name: 'location', required: false, description: 'Localização do fornecedor (busca parcial)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Fornecedores encontrados', 
    type: [SupplierResponseDto] 
  })
  search(@Query(ValidationPipe) findSupplierDto: FindSupplierDto): Promise<SupplierResponseDto[]> {
    return this.supplierService.search(findSupplierDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar fornecedor por ID' })
  @ApiParam({ name: 'id', description: 'ID do fornecedor' })
  @ApiResponse({ 
    status: 200, 
    description: 'Fornecedor encontrado', 
    type: SupplierResponseDto 
  })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SupplierResponseDto> {
    return this.supplierService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar fornecedor' })
  @ApiParam({ name: 'id', description: 'ID do fornecedor' })
  @ApiBody({ type: UpdateSupplierDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Fornecedor atualizado com sucesso', 
    type: SupplierResponseDto 
  })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  @ApiResponse({ status: 409, description: 'CNPJ ou email já cadastrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body(ValidationPipe) updateSupplierDto: UpdateSupplierDto
  ): Promise<SupplierResponseDto> {
    return this.supplierService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover fornecedor' })
  @ApiParam({ name: 'id', description: 'ID do fornecedor' })
  @ApiResponse({ 
    status: 200, 
    description: 'Fornecedor removido com sucesso', 
    type: SupplierResponseDto 
  })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<SupplierResponseDto> {
    return this.supplierService.remove(id);
  }
}
