import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../repositories/user.repository';
import { excludeFieldsInEntity } from '../../utils/exclude-fields';
import { UpdateUserDtoSchema } from '../../../http/controllers/user.controller';
import { hash } from 'bcryptjs';

@Injectable()
export class UpdateByIdUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    id: string,
    { email, password, name, collegeId }: UpdateUserDtoSchema,
  ) {
    const isUserExists = await this.userRepository.findById(id);

    if (!isUserExists) throw new NotFoundException('Usuário não encontrado');

    let passwordHashed = undefined;
    if (password) passwordHashed = await hash(password, 10);

    const user = await this.userRepository.updateById(id, {
      email,
      name,
      collegeId,
      password: passwordHashed,
    });

    excludeFieldsInEntity(user, 'password');

    return user;
  }
}
