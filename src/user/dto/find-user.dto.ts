import { ApiProperty } from '@nestjs/swagger';
import { 
    IsString, 
    IsEmail, 
    IsOptional, 
    IsNumber, 
    Length, 
    Matches 
} from 'class-validator';
import { Type } from 'class-transformer';

export class FindUserDto {
    @ApiProperty({ 
        example: 1, 
        description: 'ID do usuário para busca',
        required: false 
    })
    @IsOptional()
    @IsNumber({}, { message: 'ID deve ser um número' })
    @Type(() => Number)
    id?: number;

    @ApiProperty({ 
        example: '12345678901', 
        description: 'CPF do usuário para busca',
        required: false 
    })
    @IsOptional()
    @IsString({ message: 'CPF deve ser uma string' })
    @Length(11, 11, { message: 'CPF deve ter exatamente 11 dígitos' })
    @Matches(/^\d{11}$/, { message: 'CPF deve conter apenas números' })
    cpf?: string;

    @ApiProperty({ 
        example: 'john.doe@example.com', 
        description: 'Email do usuário para busca',
        required: false 
    })
    @IsOptional()
    @IsEmail({}, { message: 'Email deve ter um formato válido' })
    email?: string;
}
