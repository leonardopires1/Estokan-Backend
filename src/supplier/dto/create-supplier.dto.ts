import { ApiProperty } from '@nestjs/swagger';
import { 
    IsString, 
    IsNotEmpty, 
    IsEmail,
    Length, 
    MinLength 
} from 'class-validator';

export class CreateSupplierDto {
    @ApiProperty({ example: '12.345.678/0001-90', description: 'CNPJ do fornecedor' })
    @IsString({ message: 'CNPJ deve ser uma string' })
    @IsNotEmpty({ message: 'CNPJ é obrigatório' })
    @Length(14, 18, { message: 'CNPJ deve ter entre 14 e 18 caracteres' })
    cnpj: string;

    @ApiProperty({ example: 'Fornecedor XYZ Ltda', description: 'Nome da empresa fornecedora' })
    @IsString({ message: 'Nome deve ser uma string' })
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
    name: string;

    @ApiProperty({ example: 'contato@fornecedorxyz.com', description: 'Email de contato do fornecedor' })
    @IsEmail({}, { message: 'Email deve ter um formato válido' })
    @IsNotEmpty({ message: 'Email é obrigatório' })
    email: string;

    @ApiProperty({ example: '(11) 91234-5678', description: 'Telefone de contato do fornecedor' })
    @IsString({ message: 'Telefone deve ser uma string' })
    @IsNotEmpty({ message: 'Telefone é obrigatório' })
    phone: string;

    @ApiProperty({ example: 'Rua Exemplo, 123, São Paulo, SP', description: 'Endereço do fornecedor' })
    @IsString({ message: 'Endereço deve ser uma string' })
    @IsNotEmpty({ message: 'Endereço é obrigatório' })
    address: string;
}
