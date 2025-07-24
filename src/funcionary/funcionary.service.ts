import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateFuncionaryDto } from './dto/create-funcionary.dto';
import { UpdateFuncionaryDto } from './dto/update-funcionary.dto';
import { FindFuncionaryDto } from './dto/find-funcionary.dto';
import { FuncionaryResponseDto } from './dto/funcionary-response.dto';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class FuncionaryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFuncionaryDto: CreateFuncionaryDto): Promise<FuncionaryResponseDto> {
    try {
      // Hash da senha antes de salvar
      const hashedPassword = await bcrypt.hash(createFuncionaryDto.password, 12);
      
      const functionary = await this.prisma.funcionary.create({ 
        data: {
          ...createFuncionaryDto,
          password: hashedPassword,
        },
        include: {
          work: true,
        }
      });

      // Remover a senha da resposta
      const { password, ...result } = functionary;
      return result;
    } catch (error) {
      if (error.code === 'P2002') {
        if (error.meta?.target?.includes('cpf')) {
          throw new ConflictException('CPF já cadastrado');
        }
        if (error.meta?.target?.includes('email')) {
          throw new ConflictException('Email já cadastrado');
        }
      }
      throw error;
    }
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
