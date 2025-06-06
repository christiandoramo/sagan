import { Injectable, NotFoundException } from '@nestjs/common';
import { IEventRepository } from '../../repositories/event.repository';
import { UpdateEventDtoSchema } from '../../../http/controllers/event.controller';

@Injectable()
export class UpdateByIdEventUseCase {
  constructor(private eventRepository: IEventRepository) {}

  async execute(
    id: string,
    {
      title,
      description,
      category,
      startDate,
      endDate,
      usersIds,
      uploadId,
    }: UpdateEventDtoSchema,
  ) {
    const isEventExists = await this.eventRepository.findById(id);

    if (!isEventExists) throw new NotFoundException('Evento não encontrado');

    const event = await this.eventRepository.updateById(id, {
      title,
      description,
      category,
      startDate,
      endDate,
      usersIds,
      uploadId,
    });

    return event;
  }
}

@Injectable()
export class UpdateByIdEventIncludeUse {
  constructor(private eventRepository: IEventRepository) {}

  async execute(
    id: string,
    {
      title,
      description,
      category,
      startDate,
      endDate,
      usersIds,
      uploadId,
    }: UpdateEventDtoSchema,
  ) {
    const isEventExists = await this.eventRepository.findById(id);

    if (!isEventExists) throw new NotFoundException('Evento não encontrado');

    const event = await this.eventRepository.updateById(id, {
      title,
      description,
      category,
      startDate,
      endDate,
      usersIds,
      uploadId,
    });

    return event;
  }
}
