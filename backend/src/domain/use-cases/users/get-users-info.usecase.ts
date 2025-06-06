import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../repositories/user.repository';

@Injectable()
export class GetUsersInfoUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute() {
    const users = await this.userRepository.getUsersInfo();

    return users;
  }
}
