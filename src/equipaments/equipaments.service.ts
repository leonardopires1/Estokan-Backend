import { Injectable } from '@nestjs/common';
import { CreateEquipamentDto } from './dto/create-equipament.dto';
import { UpdateEquipamentDto } from './dto/update-equipament.dto';
import { FindEquipamentDto } from './dto/find-equipament.dto';
import { EquipamentResponseDto } from './dto/equipament-response.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class EquipamentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEquipamentDto: CreateEquipamentDto): Promise<EquipamentResponseDto> {
    return this.prisma.equipament.create({ 
      data: createEquipamentDto,
      include: {
        supplier: {
          select: {
            id: true,
            cnpj: true,
            name: true,
            email: true,
          },
        },
        functionary: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
        work: {
          select: {
            id: true,
            title: true,
            description: true,
            ownerCpf: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<EquipamentResponseDto[]> {
    return this.prisma.equipament.findMany({
      include: {
        supplier: {
          select: {
            id: true,
            cnpj: true,
            name: true,
            email: true,
          },
        },
        functionary: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
        work: {
          select: {
            id: true,
            title: true,
            description: true,
            ownerCpf: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<EquipamentResponseDto | null> {
    return this.prisma.equipament.findUnique({ 
      where: { id },
      include: {
        supplier: {
          select: {
            id: true,
            cnpj: true,
            name: true,
            email: true,
          },
        },
        functionary: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
        work: {
          select: {
            id: true,
            title: true,
            description: true,
            ownerCpf: true,
          },
        },
      },
    });
  }

  // Método para buscar por diferentes critérios
  async findBy(findEquipamentDto: FindEquipamentDto): Promise<EquipamentResponseDto[]> {
    const { id, name, type, status, supplierId, functionaryId, workId } = findEquipamentDto;
    
    const where: any = {};
    
    if (id) where.id = id;
    if (name) where.name = { contains: name };
    if (type) where.type = type;
    if (status) where.status = status;
    if (supplierId) where.supplierId = supplierId;
    if (functionaryId) where.functionaryId = functionaryId;
    if (workId) where.workId = workId;
    
    const equipaments = await this.prisma.equipament.findMany({
      where,
      include: {
        supplier: {
          select: {
            id: true,
            cnpj: true,
            name: true,
            email: true,
          },
        },
        functionary: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
        work: {
          select: {
            id: true,
            title: true,
            description: true,
            ownerCpf: true,
          },
        },
      },
    });
    
    return equipaments;
  }

  async update(id: number, updateEquipamentDto: UpdateEquipamentDto): Promise<EquipamentResponseDto> {
    return this.prisma.equipament.update({ 
      where: { id }, 
      data: updateEquipamentDto,
      include: {
        supplier: {
          select: {
            id: true,
            cnpj: true,
            name: true,
            email: true,
          },
        },
        functionary: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
        work: {
          select: {
            id: true,
            title: true,
            description: true,
            ownerCpf: true,
          },
        },
      },
    });
  }

  async assignSupplier(id: number, supplierId: number | null): Promise<EquipamentResponseDto> {
    return this.prisma.equipament.update({
      where: { id },
      data: { supplierId },
      include: {
        supplier: {
          select: {
            id: true,
            cnpj: true,
            name: true,
            email: true,
          },
        },
        functionary: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
        work: {
          select: {
            id: true,
            title: true,
            description: true,
            ownerCpf: true,
          },
        },
      },
    });
  }

  async assignWork(id: number, workId: number | null): Promise<EquipamentResponseDto> {
    return this.prisma.equipament.update({
      where: { id },
      data: { workId, status: 'EM_USO' }, 
      include: {
        supplier: {
          select: {
            id: true,
            cnpj: true,
            name: true,
            email: true,
          },
        },
        functionary: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
        work: {
          select: {
            id: true,
            title: true,
            description: true,
            ownerCpf: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<EquipamentResponseDto> {
    return this.prisma.equipament.delete({ 
      where: { id },
      include: {
        supplier: {
          select: {
            id: true,
            cnpj: true,
            name: true,
            email: true,
          },
        },
        functionary: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
        work: {
          select: {
            id: true,
            title: true,
            description: true,
            ownerCpf: true,
          },
        },
      },
    });
  }
}
