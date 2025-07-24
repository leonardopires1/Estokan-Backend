import { ApiProperty } from '@nestjs/swagger';

export class FindUserDto {
    @ApiProperty({ 
        example: 1, 
        description: 'ID do usuário para busca',
        required: false 
    })
    id?: number;

    @ApiProperty({ 
        example: '12345678901', 
        description: 'CPF do usuário para busca',
        required: false 
    })
    cpf?: string;

    @ApiProperty({ 
        example: 'john.doe@example.com', 
        description: 'Email do usuário para busca',
        required: false 
    })
    email?: string;
}
