import { Injectable } from '@nestjs/common';
import { IEventRepository } from '../../../../domain/repositories/event.repository';
import { PrismaService } from '../prisma.service';
import { Event, User } from '@prisma/client';
import {
  CreateEventDtoSchema,
  UpdateEventDtoSchema,
} from '../../../../http/controllers/event.controller';
import { excludeFieldsInEntity } from '../../../../domain/utils/exclude-fields';

@Injectable()
export class EventPrismaRepository implements IEventRepository {
  private include = {
    banner: {
      select: {
        filename: true,
        url: true,
      },
    },
    users: true,
  };

  constructor(private prisma: PrismaService) {}

  async create({
    description,
    startDate,
    category,
    title,
    uploadId,
    roles,
    endDate,
    usersIds,
    criterias,
  }: CreateEventDtoSchema): Promise<Event> {
    let userData = [];

    if (usersIds && usersIds.length > 0) {
      userData = usersIds.map((userId, index) => ({
        userId,
        role: roles && roles.length > index ? roles[index] : 'PARTICIPANT',
      }));
    }

    const event = await this.prisma.event.create({
      data: {
        description,
        startDate,
        category,
        title,
        criterias,
        uploadId: uploadId ?? undefined,
        endDate,
        users: {
          create: userData,
        },
      },
      include: this.include,
    });

    return event;
  }

  async findById(id: string): Promise<Event> {
    const event = await this.prisma.event.findFirst({
      where: { id },
      include: this.include,
    });

    return event;
  }

  async findUsersByEventId(eventId: string): Promise<User[]> {
    const userEvents = await this.prisma.usersEvents.findMany({
      where: {
        eventId,
      },
    });

    const userIds = userEvents.map((userEvent) => userEvent.userId);

    const userPromises = userIds.map((userId) =>
      this.prisma.user.findFirst({
        where: {
          id: userId,
        },
      }),
    );

    const users = await Promise.all(userPromises);

    excludeFieldsInEntity(users, 'password');

    return users;
  }

  async findAll(): Promise<Event[]> {
    return await this.prisma.event.findMany({
      where: {
        isActive: true,
      },
      include: this.include,
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.event.delete({ where: { id } });

    await this.prisma.usersEvents.deleteMany({
      where: {
        eventId: id,
      },
    });
  }

  async updateById(
    id: string,
    {
      description,
      startDate,
      category,
      title,
      uploadId,
      endDate,
      usersIds,
      roles,
      criterias,
    }: UpdateEventDtoSchema,
  ) {
    let userData = [];

    if (usersIds && usersIds.length > 0) {
      userData = usersIds.map((userId, index) => ({
        userId,
        role: roles && roles.length > index ? roles[index] : 'PARTICIPANT',
      }));
    }

    await this.prisma.usersEvents.deleteMany({
      where: {
        userId: {
          in: usersIds,
        },
        eventId: id,
      },
    });

    return await this.prisma.event.update({
      where: { id },
      data: {
        description,
        startDate,
        category,
        title,
        uploadId,
        endDate,
        users: {
          create: userData,
        },
        criterias,
      },
      include: this.include,
    });
  }
}
