import { ApiProperty } from '@nestjs/swagger';
import { 
    IsString, 
    IsEmail, 
    IsNotEmpty, 
    Length, 
    Matches, 
    MinLength 
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: '12345678901', description: 'CPF do usuário (somente números)' })
    @IsString({ message: 'CPF deve ser uma string' })
    @IsNotEmpty({ message: 'CPF é obrigatório' })
    @Length(11, 11, { message: 'CPF deve ter exatamente 11 dígitos' })
    @Matches(/^\d{11}$/, { message: 'CPF deve conter apenas números' })
    cpf: string;

    @ApiProperty({ example: 'John Doe', description: 'Nome completo do usuário' })
    @IsString({ message: 'Nome deve ser uma string' })
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @Length(2, 100, { message: 'Nome deve ter entre 2 e 100 caracteres' })
    name: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'Email válido do usuário' })
    @IsEmail({}, { message: 'Email deve ter um formato válido' })
    @IsNotEmpty({ message: 'Email é obrigatório' })
    email: string;

    @ApiProperty({ example: 'password123', description: 'Senha do usuário (mínimo 6 caracteres)' })
    @IsString({ message: 'Senha deve ser uma string' })
    @IsNotEmpty({ message: 'Senha é obrigatória' })
    @MinLength(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
    password: string;

    // @ApiProperty({ type: [Work] })
    // works?: Work[]; // Optional, can be an empty array or undefined
}


