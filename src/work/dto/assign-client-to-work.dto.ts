import { ApiProperty } from '@nestjs/swagger';
import { 
    IsString, 
    IsNotEmpty, 
    Length,
    Matches 
} from 'class-validator';

export class AssignClientToWorkDto {
    @ApiProperty({ example: '12345678901', description: 'CPF do novo proprietário da obra (somente números)' })
    @IsString({ message: 'CPF deve ser uma string' })
    @IsNotEmpty({ message: 'CPF é obrigatório' })
    @Length(11, 11, { message: 'CPF deve ter exatamente 11 dígitos' })
    @Matches(/^\d{11}$/, { message: 'CPF deve conter apenas números' })
    clientCpf: string;
}
