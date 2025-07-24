import { ApiProperty } from '@nestjs/swagger';

export class SupplierResponseDto {
    @ApiProperty({ example: 1, description: 'ID único do fornecedor' })
    id: number;

    @ApiProperty({ example: '12.345.678/0001-90', description: 'CNPJ do fornecedor' })
    cnpj: string;

    @ApiProperty({ example: 'Fornecedor XYZ Ltda', description: 'Nome da empresa fornecedora' })
    name: string;

    @ApiProperty({ example: 'contato@fornecedorxyz.com', description: 'Email de contato do fornecedor' })
    email: string;

    @ApiProperty({ example: 'São Paulo, SP', description: 'Localização do fornecedor' })
    location: string;

    @ApiProperty({ example: '2024-07-24T12:00:00Z', description: 'Data de criação' })
    createdAt: Date;

    @ApiProperty({ example: '2024-07-24T12:00:00Z', description: 'Data de atualização' })
    updatedAt: Date;

    // Relacionamentos opcionais
    @ApiProperty({ 
        description: 'Lista de equipamentos fornecidos por este fornecedor',
        required: false,
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                description: { type: 'string' },
                type: { type: 'string' },
                status: { type: 'string' }
            }
        }
    })
    equipaments?: {
        id: number;
        name: string;
        description: string;
        type: string;
        status: string;
    }[];
}
