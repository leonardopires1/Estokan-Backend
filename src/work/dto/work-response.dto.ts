import { ApiProperty } from '@nestjs/swagger';

export class WorkResponseDto {
    @ApiProperty({ example: 1, description: 'ID único da obra' })
    id: number;

    @ApiProperty({ example: '12345678901', description: 'CPF do proprietário da obra' })
    ownerCpf: string;

    @ApiProperty({ example: 'Construção de Casa Residencial', description: 'Título da obra' })
    title: string;

    @ApiProperty({ example: 'Construção de uma casa residencial de 150m² com 3 quartos', description: 'Descrição detalhada da obra' })
    description: string;

    @ApiProperty({ example: '2024-07-24T12:00:00Z', description: 'Data de criação' })
    createdAt: Date;

    @ApiProperty({ example: '2024-07-24T12:00:00Z', description: 'Data de atualização' })
    updatedAt: Date;

    // Relacionamentos opcionais
    owner?: {
        id: number;
        cpf: string;
        name: string;
        email: string;
    };

    functionaries?: Array<{
        id: number;
        cpf: string;
        name: string;
        email: string;
    }>;

    equipaments?: Array<{
        id: number;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}