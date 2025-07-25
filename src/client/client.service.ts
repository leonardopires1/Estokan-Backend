import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { FindClientDto } from './dto/find-client.dto';
import { ClientResponseDto } from './dto/client-response.dto';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(CreateClientDto: CreateClientDto): Promise<ClientResponseDto> {
    try {
      const hashedPassword = await bcrypt.hash(CreateClientDto.password, 12);
      const client = await this.prisma.client.create({
        data: { ...CreateClientDto, password: hashedPassword },
      });
      return client;
    } catch (error) {
      throw new Error('Error creating client: ' + error.message);
    }
  }

  async findAll(): Promise<ClientResponseDto[]> {
    return this.prisma.client.findMany({
      include: {
        works: {
          select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<ClientResponseDto | null> {
    return this.prisma.client.findUnique({ 
      where: { id },
      include: {
        works: {
          select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  // Método para buscar por diferentes critérios
  async findBy(FindClientDto: FindClientDto): Promise<ClientResponseDto | null> {
    const { id, cpf, email } = FindClientDto;
    
    if (id) {
      return this.prisma.client.findUnique({ where: { id } });
    }
    
    if (cpf) {
      return this.prisma.client.findUnique({ where: { cpf } });
    }
    
    if (email) {
      return this.prisma.client.findUnique({ where: { email } });
    }
    
    return null;
  }

  async update(id: number, UpdateClientDto: UpdateClientDto): Promise<ClientResponseDto> {
    return this.prisma.client.update({ where: { id }, data: UpdateClientDto });
  }

  async remove(id: number): Promise<ClientResponseDto> {
    return this.prisma.client.delete({ where: { id } });
  }
}
