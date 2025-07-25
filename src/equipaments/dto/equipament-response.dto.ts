import { ApiProperty } from '@nestjs/swagger';
import { TypeEquipament, statusEquipament } from '@prisma/client';

export class EquipamentResponseDto {
    @ApiProperty({ example: 1, description: 'ID único do equipamento' })
    id: number;

    @ApiProperty({ example: 'Escavadeira Hidráulica', description: 'Nome do equipamento' })
    name: string;

    @ApiProperty({ example: 'Escavadeira para obras de grande porte', description: 'Descrição do equipamento' })
    description: string;

    @ApiProperty({ example: '2024-07-24T12:00:00Z', description: 'Data de criação' })
    createdAt: Date;

    @ApiProperty({ example: '2024-07-24T12:00:00Z', description: 'Data de atualização' })
    updatedAt: Date;

    @ApiProperty({ 
        example: 'MAQUINA', 
        description: 'Tipo do equipamento',
        enum: TypeEquipament 
    })
    type: TypeEquipament;

    @ApiProperty({ 
        example: 'DISPONIVEL', 
        description: 'Status do equipamento',
        enum: statusEquipament 
    })
    status: statusEquipament;

    @ApiProperty({ example: 1, description: 'ID do fornecedor (opcional)', required: false })
    supplierId: number | null;

    @ApiProperty({ example: 1, description: 'ID do funcionário responsável (opcional)', required: false })
    functionaryId: number | null;

    @ApiProperty({ example: 1, description: 'ID da obra onde está sendo usado (opcional)', required: false })
    workId: number | null;

    // Relacionamentos opcionais
    supplier?: {
        id: number;
        cnpj: string;
        name: string;
        email: string;
    } | null;

    functionary?: {
        id: number;
        cpf: string;
        name: string;
        email: string;
    } | null;

    work?: {
        id: number;
        title: string;
        description: string;
        ownerCpf: string;
    } | null;
}
