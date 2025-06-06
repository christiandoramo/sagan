import { Injectable, NotFoundException } from '@nestjs/common';
import { IEventRepository } from '../../repositories/event.repository';

@Injectable()
export class DeleteByIdEventUseCase {
  constructor(private eventRepository: IEventRepository) {}

  async execute(id: string) {
    const event = await this.eventRepository.findById(id);

    if (!event) throw new NotFoundException('Evento não encontrado');

    await this.eventRepository.deleteById(id);
  }
}
