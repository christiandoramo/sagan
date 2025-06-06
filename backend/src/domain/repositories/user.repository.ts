import { User } from '@prisma/client';
import {
  CreateUserDtoSchema,
  UpdateUserDtoSchema,
} from '../../http/controllers/user.controller';
import { UsersGetInfoDto } from '../../infra/database/prisma/repositories/user-prisma.repository';

export abstract class IUserRepository {
  abstract create(user: CreateUserDtoSchema): Promise<User>;
  abstract findById(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract getUsersInfo(): Promise<UsersGetInfoDto[]>;
  abstract deleteById(id: string): Promise<void>;
  abstract updateById(id: string, data: UpdateUserDtoSchema): Promise<User>;
}
