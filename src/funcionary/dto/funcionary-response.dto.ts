import { ApiProperty } from '@nestjs/swagger';

export class FuncionaryResponseDto {
    @ApiProperty({ example: 1, description: 'ID único do funcionário' })
    id: number;

    @ApiProperty({ example: '12345678901', description: 'CPF do funcionário' })
    cpf: string;

    @ApiProperty({ example: 'Maria Silva', description: 'Nome completo do funcionário' })
    name: string;

    @ApiProperty({ example: 'maria.silva@example.com', description: 'Email do funcionário' })
    email: string;

    @ApiProperty({ example: '2024-07-24T12:00:00Z', description: 'Data de criação' })
    createdAt: Date;

    @ApiProperty({ example: '2024-07-24T12:00:00Z', description: 'Data de atualização' })
    updatedAt: Date;

    @ApiProperty({ example: 1, description: 'ID da obra associada (opcional)', required: false })
    workId: number | null;

    // Incluir obra se necessário
    work?: {
        id: number;
        title: string;
        description: string;
        ownerCpf: string;
        createdAt: Date;
        updatedAt: Date;
    } | null;
}
