import { ApiProperty } from '@nestjs/swagger';

export class CreateFuncionaryDto {
    @ApiProperty({ example: '12345678901', description: 'CPF do funcionário' })
    cpf: string;

    @ApiProperty({ example: 'Maria Silva', description: 'Nome completo do funcionário' })
    name: string;

    @ApiProperty({ example: 'maria.silva@example.com', description: 'Email do funcionário' })
    email: string;

    @ApiProperty({ example: 'password123', description: 'Senha do funcionário' })
    password: string;

    @ApiProperty({ example: 1, description: 'ID da obra (opcional)', required: false })
    workId?: number;
}
