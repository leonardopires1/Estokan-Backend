import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class AssignWorkDto {
  @ApiProperty({ 
    example: 1, 
    description: 'ID da obra para associar ao funcionário (null para desassociar)',
    required: false 
  })
  @IsNotEmpty()
  @IsNumber({}, { message: 'Work ID deve ser um número' })
  @Type(() => Number)
  workId?: number | null;
}
