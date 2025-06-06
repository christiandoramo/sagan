import { Event, User } from '@prisma/client';
import {
  CreateEventDtoSchema,
  UpdateEventDtoSchema,
} from '../../http/controllers/event.controller';

export abstract class IEventRepository {
  abstract create(event: CreateEventDtoSchema): Promise<Event>;
  abstract findById(id: string): Promise<Event>;
  abstract findAll(): Promise<Event[]>;
  abstract deleteById(id: string): Promise<void>;
  abstract updateById(id: string, data: UpdateEventDtoSchema): Promise<Event>;
  abstract findUsersByEventId(eventId: string): Promise<User[]>;
}
