import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export default class AssignEquipamentsDto {
  @ApiProperty({
    example: [1, 2, 3],
    description: 'IDs dos equipamentos para associar ao funcionário (null para desassociar)',
    required: false,
  })
  @IsNotEmpty()
  @IsNumber({}, { each: true, message: 'Equipament IDs devem ser números' })
  @Type(() => Number)
  equipamentIds: number[] | null;
}