import { Injectable, NotFoundException } from '@nestjs/common';
import { IArticleRepository } from '../../repositories/article.repository';
import { UpdateArticleDtoSchema } from '../../../http/controllers/article.controller';

@Injectable()
export class RegisterArticleUseCase {
  constructor(private articleRepository: IArticleRepository) {}

  async execute(
    id: string,
    { rating, usersIds, roles, status }: UpdateArticleDtoSchema,
  ) {
    const isArticleExists = await this.articleRepository.findById(id);

    if (!isArticleExists) throw new NotFoundException('Evento não encontrado');

    const article = await this.articleRepository.update(id, {
      rating,
      usersIds,
      roles,
      status,
    });

    return article;
  }
}
