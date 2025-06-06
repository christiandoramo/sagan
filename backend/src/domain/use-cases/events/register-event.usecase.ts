import { Injectable, NotFoundException } from '@nestjs/common';
import { IEventRepository } from '../../repositories/event.repository';
import { UpdateEventDtoSchema } from '../../../http/controllers/event.controller';

@Injectable()
export class RegisterUserInEventUseCase {
  constructor(private eventRepository: IEventRepository) {}

  async execute(id: string, { usersIds, roles }: UpdateEventDtoSchema) {
    const isEventExists = await this.eventRepository.findById(id);

    if (!isEventExists) throw new NotFoundException('Evento não encontrado');

    const event = await this.eventRepository.updateById(id, {
      usersIds,
      roles,
    });

    return event;
  }
}
