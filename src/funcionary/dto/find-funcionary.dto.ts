import { ApiProperty } from '@nestjs/swagger';

export class FindFuncionaryDto {
    @ApiProperty({ 
        example: 1, 
        description: 'ID do funcionário para busca',
        required: false 
    })
    id?: number;

    @ApiProperty({ 
        example: '12345678901', 
        description: 'CPF do funcionário para busca',
        required: false 
    })
    cpf?: string;

    @ApiProperty({ 
        example: 'maria.silva@example.com', 
        description: 'Email do funcionário para busca',
        required: false 
    })
    email?: string;

    @ApiProperty({ 
        example: 1, 
        description: 'ID da obra para buscar funcionários',
        required: false 
    })
    workId?: number;
}
