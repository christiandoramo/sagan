import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDtoSchema } from '../../../http/controllers/event.controller';
import { IEventRepository } from '../../repositories/event.repository';
import { CreateUploadUseCase } from '../uploads/create-upload.usecase';
import { UploadType } from '@prisma/client';

@Injectable()
export class CreateEventUseCase {
  constructor(
    private eventRepository: IEventRepository,
    private createUploadUseCase: CreateUploadUseCase,
  ) {}

  async execute(
    {
      title,
      description,
      category,
      startDate,
      endDate,
      usersIds,
      roles,
      criterias,
    }: CreateEventDtoSchema,
    file: Express.Multer.File,
  ) {
    try {
      let upload = undefined;
      if (file) {
        upload = await this.createUploadUseCase.execute(
          file,
          UploadType.EVENT_BANNER,
        );
      }

      if (!criterias) {
        criterias = '';
      }

      const event = await this.eventRepository.create({
        title,
        description,
        category,
        startDate,
        endDate,
        usersIds,
        uploadId: upload?.id,
        roles,
        criterias,
      });

      return event;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
