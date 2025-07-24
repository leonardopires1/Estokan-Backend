import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll(): Promise<UserResponseDto[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<UserResponseDto | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  // Método para buscar por diferentes critérios
  async findBy(findUserDto: FindUserDto): Promise<UserResponseDto | null> {
    const { id, cpf, email } = findUserDto;
    
    if (id) {
      return this.prisma.user.findUnique({ where: { id } });
    }
    
    if (cpf) {
      return this.prisma.user.findUnique({ where: { cpf } });
    }
    
    if (email) {
      return this.prisma.user.findUnique({ where: { email } });
    }
    
    return null;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: number): Promise<UserResponseDto> {
    return this.prisma.user.delete({ where: { id } });
  }
}
