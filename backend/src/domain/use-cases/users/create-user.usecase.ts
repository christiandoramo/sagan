import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDtoSchema } from '../../../http/controllers/user.controller';
import { IUserRepository } from '../../repositories/user.repository';
import { hash } from 'bcryptjs';
import { excludeFieldsInEntity } from '../../utils/exclude-fields';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    email,
    password,
    name,
    role,
    collegeId,
  }: CreateUserDtoSchema) {
    if (await this.userRepository.findByEmail(email)) {
      throw new BadRequestException('Usuário já cadastrado');
    }

    const passwordHashed = await hash(password, 10);

    const user = await this.userRepository.create({
      email,
      password: passwordHashed,
      name,
      role,
      collegeId,
    });

    excludeFieldsInEntity(user, 'password');

    return user;
  }
}
