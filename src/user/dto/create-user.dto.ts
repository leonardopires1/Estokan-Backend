import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: '12345678901' })
    cpf: string;
    @ApiProperty({ example: 'John Doe' })
    name: string;
    @ApiProperty({ example: 'john.doe@example.com' })
    email: string;
    @ApiProperty({ example: 'password' })
    password: string;
    // @ApiProperty({ type: [Work] })
    // works?: Work[]; // Optional, can be an empty array or undefined
}


