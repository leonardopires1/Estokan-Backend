import { ApiProperty } from '@nestjs/swagger';

export class ClientResponseDto {
    @ApiProperty({ example: 1, description: 'ID único do cliente' })
    id: number;

    @ApiProperty({ example: '12345678901', description: 'CPF do cliente' })
    cpf: string;

    @ApiProperty({ example: 'John Doe', description: 'Nome completo do cliente' })
    name: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'Email do cliente' })
    email: string;

    @ApiProperty({ example: 'password', description: 'Senha do cliente' })
    password: string;

    @ApiProperty({ example: '2024-07-24T12:00:00Z', description: 'Data de criação' })
    createdAt: Date;

    @ApiProperty({ example: '2024-07-24T12:00:00Z', description: 'Data de atualização' })
    updatedAt: Date;
}
