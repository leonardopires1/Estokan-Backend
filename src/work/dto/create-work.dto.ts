import { ApiProperty } from '@nestjs/swagger';
import { 
    IsString, 
    IsNotEmpty, 
    Length, 
    Matches 
} from 'class-validator';

export class CreateWorkDto {
    @ApiProperty({ example: '12345678901', description: 'CPF do proprietário da obra (somente números)' })
    @IsString({ message: 'CPF do proprietário deve ser uma string' })
    @IsNotEmpty({ message: 'CPF do proprietário é obrigatório' })
    @Length(11, 11, { message: 'CPF deve ter exatamente 11 dígitos' })
    @Matches(/^\d{11}$/, { message: 'CPF deve conter apenas números' })
    ownerCpf: string;

    @ApiProperty({ example: 'Construção de Casa Residencial', description: 'Título da obra' })
    @IsString({ message: 'Título deve ser uma string' })
    @IsNotEmpty({ message: 'Título é obrigatório' })
    @Length(3, 200, { message: 'Título deve ter entre 3 e 200 caracteres' })
    title: string;

    @ApiProperty({ example: 'Construção de uma casa residencial de 150m² com 3 quartos', description: 'Descrição detalhada da obra' })
    @IsString({ message: 'Descrição deve ser uma string' })
    @IsNotEmpty({ message: 'Descrição é obrigatória' })
    @Length(10, 1000, { message: 'Descrição deve ter entre 10 e 1000 caracteres' })
    description: string;
}
