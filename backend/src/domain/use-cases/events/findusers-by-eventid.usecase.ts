import { Injectable } from '@nestjs/common';
import { IEventRepository } from '../../repositories/event.repository';

@Injectable()
export class FindUsersByEventIdUseCase {
  constructor(private eventRepository: IEventRepository) {}

  async execute(eventId: string) {
    const users = await this.eventRepository.findUsersByEventId(eventId);

    return users;
  }
}
