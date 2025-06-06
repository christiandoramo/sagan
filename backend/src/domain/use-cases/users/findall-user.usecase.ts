import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../repositories/user.repository';
import { excludeFieldsInEntity } from '../../utils/exclude-fields';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute() {
    const users = await this.userRepository.findAll();

    excludeFieldsInEntity(users, 'password');

    return users;
  }
}
