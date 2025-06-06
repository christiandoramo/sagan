import { BadRequestException, Injectable } from '@nestjs/common';
import { IArticleRepository } from '../../repositories/article.repository';

@Injectable()
export class FindByIdArticleUseCase {
  constructor(private articleRepository: IArticleRepository) {}

  async execute(id: string) {
    const article = await this.articleRepository.findById(id);
    if (!article) {
      throw new BadRequestException('Evento não encontrado');
    }
    return article;
  }
}
