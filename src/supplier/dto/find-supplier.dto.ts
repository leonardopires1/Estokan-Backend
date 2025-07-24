import { ApiProperty } from '@nestjs/swagger';
import { 
    IsString, 
    IsOptional, 
    IsNumber 
} from 'class-validator';
import { Type } from 'class-transformer';

export class FindSupplierDto {
    @ApiProperty({ 
        example: 1, 
        description: 'ID do fornecedor para busca',
        required: false 
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: 'ID deve ser um número' })
    id?: number;

    @ApiProperty({ 
        example: '12.345.678/0001-90', 
        description: 'CNPJ do fornecedor para busca',
        required: false 
    })
    @IsOptional()
    @IsString({ message: 'CNPJ deve ser uma string' })
    cnpj?: string;

    @ApiProperty({ 
        example: 'Fornecedor XYZ', 
        description: 'Nome do fornecedor (busca parcial)',
        required: false 
    })
    @IsOptional()
    @IsString({ message: 'Nome deve ser uma string' })
    name?: string;

    @ApiProperty({ 
        example: 'contato@fornecedor.com', 
        description: 'Email do fornecedor para busca',
        required: false 
    })
    @IsOptional()
    @IsString({ message: 'Email deve ser uma string' })
    email?: string;

    @ApiProperty({ 
        example: 'São Paulo', 
        description: 'Localização do fornecedor (busca parcial)',
        required: false 
    })
    @IsOptional()
    @IsString({ message: 'Localização deve ser uma string' })
    location?: string;
}
