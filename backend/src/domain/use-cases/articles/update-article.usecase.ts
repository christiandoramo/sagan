import { BadRequestException, Injectable } from '@nestjs/common';
import { IArticleRepository } from '../../repositories/article.repository';
import { UpdateArticleDtoSchema } from '../../../http/controllers/article.controller';

@Injectable()
export class UpdateArticleUseCase {
  constructor(private articleRepository: IArticleRepository) {}

  async execute(
    id: string,
    {
      title,
      keywords,
      knowledgeArea,
      language,
      usersIds,
      roles,
      rating,
    }: UpdateArticleDtoSchema,
  ) {
    try {
      return await this.articleRepository.update(id, {
        title,
        keywords,
        knowledgeArea,
        language,
        usersIds,
        roles,
        rating,
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
