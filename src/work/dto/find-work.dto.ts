import { ApiProperty } from '@nestjs/swagger';
import { 
    IsString, 
    IsOptional, 
    IsNumber, 
    Length, 
    Matches 
} from 'class-validator';
import { Type } from 'class-transformer';

export class FindWorkDto {
    @ApiProperty({ 
        example: 1, 
        description: 'ID da obra para busca',
        required: false 
    })
    @IsOptional()
    @IsNumber({}, { message: 'ID deve ser um número' })
    @Type(() => Number)
    id?: number;

    @ApiProperty({ 
        example: '12345678901', 
        description: 'CPF do proprietário para buscar obras',
        required: false 
    })
    @IsOptional()
    @IsString({ message: 'CPF deve ser uma string' })
    @Length(11, 11, { message: 'CPF deve ter exatamente 11 dígitos' })
    @Matches(/^\d{11}$/, { message: 'CPF deve conter apenas números' })
    ownerCpf?: string;

    @ApiProperty({ 
        example: 'Construção', 
        description: 'Buscar no título da obra',
        required: false 
    })
    @IsOptional()
    @IsString({ message: 'Título deve ser uma string' })
    title?: string;
}
