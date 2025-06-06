import { Injectable } from '@nestjs/common';
import { IEventRepository } from '../../repositories/event.repository';

@Injectable()
export class FindAllEventsUseCase {
  constructor(private eventRepository: IEventRepository) {}

  async execute() {
    const events = await this.eventRepository.findAll();

    return events;
  }
}
