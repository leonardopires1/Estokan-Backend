import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { FindSupplierDto } from './dto/find-supplier.dto';
import { SupplierResponseDto } from './dto/supplier-response.dto';

@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<SupplierResponseDto> {
    try {
      return this.prisma.supplier.create({
        data: createSupplierDto,
        include: {
          equipaments: {
            select: {
              id: true,
              name: true,
              description: true,
              type: true,
              status: true
            }
          }
        }
      });
    } catch (error) {
      if (error.code === 'P2002') {
        if (error.meta?.target?.includes('cnpj')) {
          throw new ConflictException('CNPJ já cadastrado');
        }
        if (error.meta?.target?.includes('email')) {
          throw new ConflictException('Email já cadastrado');
        }
      }
      throw error;
    }
  }

  async findAll(): Promise<SupplierResponseDto[]> {
    return this.prisma.supplier.findMany({
      include: {
        equipaments: {
          select: {
            id: true,
            name: true,
            description: true,
            type: true,
            status: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findOne(id: number): Promise<SupplierResponseDto> {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
      include: {
        equipaments: {
          select: {
            id: true,
            name: true,
            description: true,
            type: true,
            status: true
          }
        }
      }
    });

    if (!supplier) {
      throw new NotFoundException(`Fornecedor com ID ${id} não encontrado`);
    }

    return supplier;
  }

  async search(findSupplierDto: FindSupplierDto): Promise<SupplierResponseDto[]> {
    const { id, cnpj, name, email } = findSupplierDto;

    const whereClause: any = {};

    if (id) {
      whereClause.id = id;
    }

    if (cnpj) {
      whereClause.cnpj = cnpj;
    }

    if (name) {
      whereClause.name = {
        contains: name,
        mode: 'insensitive'
      };
    }

    if (email) {
      whereClause.email = email;
    }

    if (location) {
      whereClause.location = {
        contains: location,
        mode: 'insensitive'
      };
    }

    const suppliers = await this.prisma.supplier.findMany({
      where: whereClause,
      include: {
        equipaments: {
          select: {
            id: true,
            name: true,
            description: true,
            type: true,
            status: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return suppliers;
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<SupplierResponseDto> {
    // Verificar se o fornecedor existe
    await this.findOne(id);

    try {
      return this.prisma.supplier.update({
        where: { id },
        data: updateSupplierDto,
        include: {
          equipaments: {
            select: {
              id: true,
              name: true,
              description: true,
              type: true,
              status: true
            }
          }
        }
      });
    } catch (error) {
      if (error.code === 'P2002') {
        if (error.meta?.target?.includes('cnpj')) {
          throw new ConflictException('CNPJ já cadastrado');
        }
        if (error.meta?.target?.includes('email')) {
          throw new ConflictException('Email já cadastrado');
        }
      }
      throw error;
    }
  }

  async remove(id: number): Promise<SupplierResponseDto> {
    // Verificar se o fornecedor existe
    await this.findOne(id);

    return this.prisma.supplier.delete({
      where: { id },
      include: {
        equipaments: {
          select: {
            id: true,
            name: true,
            description: true,
            type: true,
            status: true
          }
        }
      }
    });
  }
}
