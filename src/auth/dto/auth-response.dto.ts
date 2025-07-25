import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
    @ApiProperty({ 
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', 
        description: 'Token JWT de acesso' 
    })
    access_token: string;

    @ApiProperty({ 
        example: 'Bearer', 
        description: 'Tipo do token' 
    })
    token_type: string;

    @ApiProperty({ 
        example: 3600, 
        description: 'Tempo de expiração em segundos' 
    })
    expires_in: number;

    @ApiProperty({ 
        description: 'Dados do funcionário autenticado',
        type: 'object',
        properties: {
            id: { type: 'number' },
            cpf: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            workId: { type: 'number', nullable: true }
        }
    })
    client: {
        id: number;
        cpf: string;
        name: string;
        email: string;
        workId: number | null;
    };
}
