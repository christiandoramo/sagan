import { Injectable } from '@nestjs/common';
import { IArticleRepository } from '../../repositories/article.repository';

@Injectable()
export class FindAllArticleUseCase {
  constructor(private articleRepository: IArticleRepository) {}

  async execute() {
    const articles = await this.articleRepository.findAll();

    return articles;
  }
}
