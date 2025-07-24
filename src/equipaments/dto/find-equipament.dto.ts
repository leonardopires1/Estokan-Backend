import { ApiProperty } from '@nestjs/swagger';
import { 
    IsString, 
    IsOptional, 
    IsNumber, 
    IsEnum
} from 'class-validator';
import { Type } from 'class-transformer';
import { TypeEquipament, statusEquipament } from '@prisma/client';

export class FindEquipamentDto {
    @ApiProperty({ 
        example: 1, 
        description: 'ID do equipamento para busca',
        required: false 
    })
    @IsOptional()
    @IsNumber({}, { message: 'ID deve ser um número' })
    @Type(() => Number)
    id?: number;

    @ApiProperty({ 
        example: 'Escavadeira', 
        description: 'Nome do equipamento para busca',
        required: false 
    })
    @IsOptional()
    @IsString({ message: 'Nome deve ser uma string' })
    name?: string;

    @ApiProperty({ 
        example: 'MAQUINA', 
        description: 'Tipo do equipamento para busca',
        enum: TypeEquipament,
        required: false 
    })
    @IsOptional()
    @IsEnum(TypeEquipament, { message: 'Tipo deve ser MAQUINA, VEICULO, EPI ou OUTROS' })
    type?: TypeEquipament;

    @ApiProperty({ 
        example: 'DISPONIVEL', 
        description: 'Status do equipamento para busca',
        enum: statusEquipament,
        required: false 
    })
    @IsOptional()
    @IsEnum(statusEquipament, { message: 'Status deve ser DISPONIVEL, EM_USO, MANUTENCAO ou PERDIDO' })
    status?: statusEquipament;

    @ApiProperty({ 
        example: 1, 
        description: 'ID do fornecedor para buscar equipamentos',
        required: false 
    })
    @IsOptional()
    @IsNumber({}, { message: 'ID do fornecedor deve ser um número' })
    @Type(() => Number)
    supplierId?: number;

    @ApiProperty({ 
        example: 1, 
        description: 'ID do funcionário para buscar equipamentos',
        required: false 
    })
    @IsOptional()
    @IsNumber({}, { message: 'ID do funcionário deve ser um número' })
    @Type(() => Number)
    functionaryId?: number;

    @ApiProperty({ 
        example: 1, 
        description: 'ID da obra para buscar equipamentos',
        required: false 
    })
    @IsOptional()
    @IsNumber({}, { message: 'ID da obra deve ser um número' })
    @Type(() => Number)
    workId?: number;
}
