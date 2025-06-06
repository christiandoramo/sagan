import { PrismaService } from '../prisma.service';
import { Article } from '@prisma/client';
import { IArticleRepository } from '../../../../domain/repositories/article.repository';
import {
  CreateArticleDtoSchema,
  UpdateArticleDtoSchema,
} from '../../../../http/controllers/article.controller';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticlePrismaRepository implements IArticleRepository {
  private include = {
    file: {
      select: {
        filename: true,
        url: true,
      },
    },
    users: {
      select: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        role: true,
      },
    },
  };

  constructor(private prisma: PrismaService) {}

  async update(
    id: string,
    {
      keywords,
      knowledgeArea,
      language,
      rating,
      roles,
      title,
      status,
      uploadId,
      usersIds,
    }: UpdateArticleDtoSchema,
  ): Promise<Article> {
    let userData = [];

    if (usersIds && usersIds.length > 0) {
      userData = usersIds.map((userId, index) => ({
        userId,
        role: roles && roles.length > index ? roles[index] : 'AUTHOR',
      }));
    }

    await this.prisma.usersArticles.deleteMany({
      where: {
        userId: {
          in: usersIds,
        },
      },
    });

    const articleUpdated = await this.prisma.article.update({
      where: { id },
      data: {
        title,
        keywords,
        knowledgeArea,
        language,
        rating,
        status,
        file: uploadId ? { connect: { id: uploadId } } : undefined,
        users: {
          create: userData,
        },
      },
      include: this.include,
    });

    return articleUpdated;
  }

  async findAll(): Promise<Article[]> {
    const articles = await this.prisma.article.findMany({
      include: this.include,
    });

    // for (const article of articles) {
    //   if (typeof article.rating === 'object') {
    //     console.log(article.rating);
    //     article.rating = JSON.parse(article.rating);
    //   }
    // }

    return articles;
  }

  async findById(id: string): Promise<Article> {
    return await this.prisma.article.findFirst({
      where: { id },
      include: this.include,
    });
  }

  async create({
    title,
    keywords,
    knowledgeArea,
    language,
    rating,
    uploadId,
    usersIds,
    roles,
  }: CreateArticleDtoSchema): Promise<Article> {
    let userData = [];

    if (usersIds && usersIds.length > 0) {
      userData = usersIds.map((userId, index) => ({
        userId,
        role: roles && roles.length > index ? roles[index] : 'AUTHOR',
      }));
    }

    const article: any = await this.prisma.article.create({
      data: {
        title,
        keywords,
        knowledgeArea,
        language,
        rating,
        file: uploadId ? { connect: { id: uploadId } } : undefined,
        users: {
          create: userData,
        },
      },
      include: this.include,
    });

    article.users = article.users.map((user) => ({
      id: user.user.id,
      name: user.user.name,
      email: user.user.email,
      role: user.role,
    }));

    return article;
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.article.delete({ where: { id } });

    await this.prisma.usersArticles.deleteMany({
      where: {
        articleId: id,
      },
    });
  }
}
