import { PartialType } from '@nestjs/mapped-types';
import { CreateFuncionaryDto } from './create-funcionary.dto';

export class UpdateFuncionaryDto extends PartialType(CreateFuncionaryDto) {}
