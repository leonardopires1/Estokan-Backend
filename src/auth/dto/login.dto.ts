import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({ 
        example: 'funcionario@email.com', 
        description: 'Email do funcionário' 
    })
    @IsEmail({}, { message: 'Email deve ter um formato válido' })
    @IsNotEmpty({ message: 'Email é obrigatório' })
    email: string;

    @ApiProperty({ 
        example: 'senha123', 
        description: 'Senha do funcionário' 
    })
    @IsString({ message: 'Senha deve ser uma string' })
    @IsNotEmpty({ message: 'Senha é obrigatória' })
    @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
    password: string;
}
