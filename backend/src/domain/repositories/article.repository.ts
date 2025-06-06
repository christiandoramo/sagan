import { Article } from '@prisma/client';
import {
  CreateArticleDtoSchema,
  UpdateArticleDtoSchema,
} from '../../http/controllers/article.controller';

export abstract class IArticleRepository {
  abstract create(article: CreateArticleDtoSchema): Promise<Article>;
  abstract findAll(): Promise<Article[]>;
  abstract findById(id: string): Promise<Article>;
  abstract deleteById(id: string): Promise<void>;
  abstract update(
    id: string,
    article: UpdateArticleDtoSchema,
  ): Promise<Article>;
}
