import { Injectable } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { FindWorkDto } from './dto/find-work.dto';
import { WorkResponseDto } from './dto/work-response.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class WorkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkDto: CreateWorkDto): Promise<WorkResponseDto> {
    return this.prisma.work.create({ 
      data: createWorkDto,
      include: {
        owner: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
        functionaries: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<WorkResponseDto[]> {
    return this.prisma.work.findMany({
      include: {
        owner: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
        functionaries: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<WorkResponseDto | null> {
    return this.prisma.work.findUnique({ 
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
        functionaries: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  // Método para buscar por diferentes critérios
  async findBy(findWorkDto: FindWorkDto): Promise<WorkResponseDto | null> {
    const { id, ownerCpf, title } = findWorkDto;
    
    if (id) {
      return this.prisma.work.findUnique({ 
        where: { id },
        include: {
          owner: {
            select: {
              id: true,
              cpf: true,
              name: true,
              email: true,
            },
          },
          functionaries: {
            select: {
              id: true,
              cpf: true,
              name: true,
              email: true,
            },
          },
        },
      });
    }
    
    if (ownerCpf) {
      return this.prisma.work.findFirst({ 
        where: { ownerCpf },
        include: {
          owner: {
            select: {
              id: true,
              cpf: true,
              name: true,
              email: true,
            },
          },
          functionaries: {
            select: {
              id: true,
              cpf: true,
              name: true,
              email: true,
            },
          },
        },
      });
    }
    
    if (title) {
      return this.prisma.work.findFirst({ 
        where: { 
          title: {
            contains: title,
          },
        },
        include: {
          owner: {
            select: {
              id: true,
              cpf: true,
              name: true,
              email: true,
            },
          },
          functionaries: {
            select: {
              id: true,
              cpf: true,
              name: true,
              email: true,
            },
          },
        },
      });
    }
    
    return null;
  }

  async update(id: number, updateWorkDto: UpdateWorkDto): Promise<WorkResponseDto> {
    return this.prisma.work.update({ 
      where: { id }, 
      data: updateWorkDto,
      include: {
        owner: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
        functionaries: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<WorkResponseDto> {
    return this.prisma.work.delete({ 
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
        functionaries: {
          select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}
