import { BadRequestException, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../../domain/repositories/user.repository';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import {
  CreateUserDtoSchema,
  UpdateUserDtoSchema,
} from '../../../../http/controllers/user.controller';
import { excludeFieldsInEntity } from '../../../../domain/utils/exclude-fields';

export type UsersGetInfoDto = Omit<
  User,
  'email' | 'password' | 'collegeId' | 'role' | 'createdAt' | 'updatedAt'
>;

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  private include = {
    college: {
      select: {
        id: true,
        name: true,
        initials: true,
      },
    },

    events: true,
  };

  async create({
    name,
    email,
    password,
    role,
    collegeId,
  }: CreateUserDtoSchema): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
        collegeId,
      },
      include: this.include,
    });

    excludeFieldsInEntity(user, 'collegeId');

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      excludeFieldsInEntity(user, 'collegeId');
    }

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: this.include,
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    excludeFieldsInEntity(user, 'collegeId');

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: this.include,
    });

    excludeFieldsInEntity(users, 'collegeId');

    return users;
  }

  async getUsersInfo(): Promise<UsersGetInfoDto[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return users;
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async updateById(
    id: string,
    { name, email, password, collegeId }: UpdateUserDtoSchema,
  ) {
    const user = this.prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
        collegeId,
      },
    });

    excludeFieldsInEntity(user, 'collegeId');

    return user;
  }
}
