import { CreateUploadUseCase } from './../uploads/create-upload.usecase';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IArticleRepository } from '../../repositories/article.repository';
import { CreateArticleDtoSchema } from '../../../http/controllers/article.controller';
import { UploadType } from '@prisma/client';

@Injectable()
export class CreateArticleUseCase {
  constructor(
    private articleRepository: IArticleRepository,
    private createUploadUseCase: CreateUploadUseCase,
  ) {}

  async execute(
    {
      title,
      keywords,
      knowledgeArea,
      language,
      rating,
      usersIds,
      roles,
    }: CreateArticleDtoSchema,
    file: Express.Multer.File,
  ) {
    try {
      let upload = undefined;
      if (file) {
        upload = await this.createUploadUseCase.execute(
          file,
          UploadType.ARTICLE,
        );
      }

      const event = await this.articleRepository.create({
        title,
        keywords,
        knowledgeArea,
        language,
        rating,
        uploadId: upload?.id,
        usersIds,
        roles,
      });

      return event;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
