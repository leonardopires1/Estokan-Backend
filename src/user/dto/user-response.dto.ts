import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({ example: 1, description: 'ID único do usuário' })
    id: number;

    @ApiProperty({ example: '12345678901', description: 'CPF do usuário' })
    cpf: string;

    @ApiProperty({ example: 'John Doe', description: 'Nome completo do usuário' })
    name: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'Email do usuário' })
    email: string;

    @ApiProperty({ example: 'password', description: 'Senha do usuário' })
    password: string;

    @ApiProperty({ example: '2024-07-24T12:00:00Z', description: 'Data de criação' })
    createdAt: Date;

    @ApiProperty({ example: '2024-07-24T12:00:00Z', description: 'Data de atualização' })
    updatedAt: Date;
}
