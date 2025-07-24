import { Injectable } from '@nestjs/common';
import { CreateFuncionaryDto } from './dto/create-funcionary.dto';
import { UpdateFuncionaryDto } from './dto/update-funcionary.dto';
import { FindFuncionaryDto } from './dto/find-funcionary.dto';
import { FuncionaryResponseDto } from './dto/funcionary-response.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FuncionaryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFuncionaryDto: CreateFuncionaryDto): Promise<FuncionaryResponseDto> {
    return this.prisma.funcionary.create({ data: createFuncionaryDto });
  }

  async findAll(): Promise<FuncionaryResponseDto[]> {
    return this.prisma.funcionary.findMany({
      include: {
        work: true, // Incluir informações da obra se necessário
      },
    });
  }

  async findOne(id: number): Promise<FuncionaryResponseDto | null> {
    return this.prisma.funcionary.findUnique({ 
      where: { id },
      include: {
        work: true,
      },
    });
  }

  // Método para buscar por diferentes critérios
  async findBy(findFuncionaryDto: FindFuncionaryDto): Promise<FuncionaryResponseDto[]> {
    const { id, cpf, email, workId } = findFuncionaryDto;
    
    if (id) {
      const funcionary = await this.prisma.funcionary.findUnique({ 
        where: { id },
        include: { work: true },
      });
      return funcionary ? [funcionary] : [];
    }
    
    if (cpf) {
      const funcionary = await this.prisma.funcionary.findUnique({ 
        where: { cpf },
        include: { work: true },
      });
      return funcionary ? [funcionary] : [];
    }
    
    if (email) {
      const funcionary = await this.prisma.funcionary.findUnique({ 
        where: { email },
        include: { work: true },
      });
      return funcionary ? [funcionary] : [];
    }
    
    if (workId) {
      return this.prisma.funcionary.findMany({ 
        where: { workId },
        include: { work: true },
      });
    }
    
    return [];
  }

  async update(id: number, updateFuncionaryDto: UpdateFuncionaryDto): Promise<FuncionaryResponseDto> {
    return this.prisma.funcionary.update({ 
      where: { id }, 
      data: updateFuncionaryDto,
      include: { work: true },
    });
  }

  async remove(id: number): Promise<FuncionaryResponseDto> {
    return this.prisma.funcionary.delete({ 
      where: { id },
      include: { work: true },
    });
  }
}
