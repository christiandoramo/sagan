import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../repositories/user.repository';
import { excludeFieldsInEntity } from '../../utils/exclude-fields';

@Injectable()
export class FindByIdUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    excludeFieldsInEntity(user, 'password');

    return user;
  }
}
