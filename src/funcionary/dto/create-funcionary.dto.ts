import { ApiProperty } from '@nestjs/swagger';
import { 
    IsString, 
    IsEmail, 
    IsNotEmpty, 
    IsOptional, 
    IsNumber, 
    Length, 
    Matches, 
    MinLength 
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFuncionaryDto {
    @ApiProperty({ example: '12345678901', description: 'CPF do funcionário (somente números)' })
    @IsString({ message: 'CPF deve ser uma string' })
    @IsNotEmpty({ message: 'CPF é obrigatório' })
    @Length(11, 11, { message: 'CPF deve ter exatamente 11 dígitos' })
    @Matches(/^\d{11}$/, { message: 'CPF deve conter apenas números' })
    cpf: string;

    @ApiProperty({ example: 'Maria Silva', description: 'Nome completo do funcionário' })
    @IsString({ message: 'Nome deve ser uma string' })
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @Length(2, 100, { message: 'Nome deve ter entre 2 e 100 caracteres' })
    name: string;

    @ApiProperty({ example: 'maria.silva@example.com', description: 'Email válido do funcionário' })
    @IsEmail({}, { message: 'Email deve ter um formato válido' })
    @IsNotEmpty({ message: 'Email é obrigatório' })
    email: string;

    @ApiProperty({ example: 'password123', description: 'Senha do funcionário (mínimo 6 caracteres)' })
    @IsString({ message: 'Senha deve ser uma string' })
    @IsNotEmpty({ message: 'Senha é obrigatória' })
    @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
    password: string;

    @ApiProperty({ example: '14981234567', description: 'Número de telefone do funcionário (opcional)' })
    @IsString({ message: 'Telefone deve ser uma string' })
    @IsNotEmpty({ message: 'Telefone é obrigatório' })
    @Length(11, 11, { message: 'Telefone deve conter exatamente 11 dígitos com o DDD' })
    @Matches(/^\d{11}$/, { message: 'Telefone deve conter apenas números' })
    phone: string;

    @ApiProperty({ example: 1, description: 'ID da obra (opcional)', required: false })
    @IsOptional()
    @IsNumber({}, { message: 'ID da obra deve ser um número' })
    @Type(() => Number)
    workId?: number;

    @ApiProperty({ example: 'USER', description: 'Função do funcionário', enum: ['ADMIN', 'USER'], default: 'USER' })
    @IsString({ message: 'Função deve ser uma string' })
    @IsNotEmpty({ message: 'Função é obrigatória' })
    role: 'ADMIN' | 'USER' = 'USER'; 
}
