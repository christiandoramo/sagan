import { BadRequestException, Injectable } from '@nestjs/common';
import { IEventRepository } from '../../repositories/event.repository';

@Injectable()
export class FindByIdEventUseCase {
  constructor(private eventRepository: IEventRepository) {}

  async execute(id: string) {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw new BadRequestException('Evento não encontrado');
    }
    return event;
  }
}
