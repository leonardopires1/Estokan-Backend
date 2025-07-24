import { ApiProperty } from '@nestjs/swagger';
import { 
    IsString, 
    IsNotEmpty, 
    IsOptional, 
    IsNumber, 
    IsEnum,
    Length, 
    MinLength 
} from 'class-validator';
import { Type } from 'class-transformer';
import { TypeEquipament, statusEquipament } from '@prisma/client';

export class CreateEquipamentDto {
    @ApiProperty({ example: 'Escavadeira Hidráulica', description: 'Nome do equipamento' })
    @IsString({ message: 'Nome deve ser uma string' })
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @Length(2, 100, { message: 'Nome deve ter entre 2 e 100 caracteres' })
    name: string;

    @ApiProperty({ example: 'Escavadeira para obras de grande porte', description: 'Descrição do equipamento' })
    @IsString({ message: 'Descrição deve ser uma string' })
    @IsNotEmpty({ message: 'Descrição é obrigatória' })
    @MinLength(10, { message: 'Descrição deve ter pelo menos 10 caracteres' })
    description: string;

    @ApiProperty({ 
        example: 'MAQUINA', 
        description: 'Tipo do equipamento',
        enum: TypeEquipament 
    })
    @IsEnum(TypeEquipament, { message: 'Tipo deve ser MAQUINA, VEICULO, EPI ou OUTROS' })
    type: TypeEquipament;

    @ApiProperty({ 
        example: 'DISPONIVEL', 
        description: 'Status do equipamento',
        enum: statusEquipament 
    })
    @IsEnum(statusEquipament, { message: 'Status deve ser DISPONIVEL, EM_USO, MANUTENCAO ou PERDIDO' })
    status: statusEquipament;

    @ApiProperty({ example: 1, description: 'ID do fornecedor (opcional)', required: false })
    @IsOptional()
    @IsNumber({}, { message: 'ID do fornecedor deve ser um número' })
    @Type(() => Number)
    supplierId?: number;

    @ApiProperty({ example: 1, description: 'ID do funcionário responsável (opcional)', required: false })
    @IsOptional()
    @IsNumber({}, { message: 'ID do funcionário deve ser um número' })
    @Type(() => Number)
    functionaryId?: number;

    @ApiProperty({ example: 1, description: 'ID da obra onde está sendo usado (opcional)', required: false })
    @IsOptional()
    @IsNumber({}, { message: 'ID da obra deve ser um número' })
    @Type(() => Number)
    workId?: number;
}
