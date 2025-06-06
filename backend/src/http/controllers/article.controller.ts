import { UpdateArticleUseCase } from './../../domain/use-cases/articles/update-article.usecase';
import { FindAllArticleUseCase } from './../../domain/use-cases/articles/findall-article.usecase';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { z } from 'nestjs-zod/z';
import { CreateArticleUseCase } from '../../domain/use-cases/articles/create-article.usecase';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindByIdArticleUseCase } from '../../domain/use-cases/articles/findbyid-article.usecase';
import { ZodValidationPipe, createZodDto, zodToOpenAPI } from 'nestjs-zod';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ArticleRole, ArticleStatus } from '@prisma/client';
import { AuthGuard } from '../../infra/auth/guards/jwt.auth.guard';
import { RegisterArticleUseCase } from '../../domain/use-cases/articles/register-article.usecase';

const createArticleDtoSchema = z.object({
  title: z.string(),
  knowledgeArea: z.string(),
  keywords: z.string(),
  language: z.string(),
  rating: z.string().default(undefined).optional(),
  usersIds: z
    .array(z.string().uuid())
    .or(
      z
        .string()
        .uuid()
        .transform((value) => [value]),
    )
    .optional()
    .default(undefined),
  roles: z
    .array(
      z.enum([ArticleRole.AUTHOR, ArticleRole.CO_AUTHOR, ArticleRole.REVIEWER]),
    )
    .or(
      z
        .string(
          z.enum([
            ArticleRole.AUTHOR,
            ArticleRole.CO_AUTHOR,
            ArticleRole.REVIEWER,
          ]),
        )
        .transform((value) => [value]),
    )
    .default([ArticleRole.AUTHOR]),
  uploadId: z.string().uuid().default(undefined).optional(),
});

export class CreateArticleDtoSchema extends createZodDto(
  createArticleDtoSchema,
) {}

const createArticleValidationPipe = new ZodValidationPipe(
  createArticleDtoSchema,
);

const updateArticleDtoSchema = z.object({
  title: z.string().optional().default(undefined),
  knowledgeArea: z.string().optional().default(undefined),
  keywords: z.string().optional().default(undefined),
  status: z
    .enum([
      ArticleStatus.CLOSED,
      ArticleStatus.PENDING,
      ArticleStatus.ON_REVIEW,
    ])
    .optional()
    .default(undefined),
  language: z.string().optional().default(undefined),
  rating: z.string().default(undefined).optional(),
  usersIds: z
    .array(z.string().uuid())
    .or(
      z
        .string()
        .uuid()
        .transform((value) => [value]),
    )
    .optional()
    .default(undefined),
  roles: z
    .array(
      z.enum([ArticleRole.AUTHOR, ArticleRole.CO_AUTHOR, ArticleRole.REVIEWER]),
    )
    .or(
      z
        .string(
          z.enum([
            ArticleRole.AUTHOR,
            ArticleRole.CO_AUTHOR,
            ArticleRole.REVIEWER,
          ]),
        )
        .transform((value) => [value]),
    )
    .optional()
    .default(undefined),
  uploadId: z.string().uuid().default(undefined).optional(),
});

const registerUserInArticleDtoSchema = z.object({
  usersIds: z
    .array(z.string().uuid())
    .or(
      z
        .string()
        .uuid()
        .transform((value) => [value]),
    )
    .optional()
    .default(undefined),
  roles: z
    .array(
      z.enum([ArticleRole.AUTHOR, ArticleRole.CO_AUTHOR, ArticleRole.REVIEWER]),
    )
    .or(
      z
        .string(
          z.enum([
            ArticleRole.AUTHOR,
            ArticleRole.CO_AUTHOR,
            ArticleRole.REVIEWER,
          ]),
        )
        .transform((value) => [value]),
    )
    .default([ArticleRole.AUTHOR])
    .optional(),
  rating: z.string().default(undefined).optional(),
  status: z
    .enum([
      ArticleStatus.CLOSED,
      ArticleStatus.PENDING,
      ArticleStatus.ON_REVIEW,
    ])
    .optional()
    .default(undefined),
});

const registerUserInArticleBodyValidationPipe = new ZodValidationPipe(
  registerUserInArticleDtoSchema,
);

export type RegisterUserInArticleDtoSchema = z.infer<
  typeof registerUserInArticleDtoSchema
>;

export class UpdateArticleDtoSchema extends createZodDto(
  updateArticleDtoSchema,
) {}

@UseGuards(AuthGuard)
@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(
    private createArticleUseCase: CreateArticleUseCase,
    private findByIdArticleUseCase: FindByIdArticleUseCase,
    private findAllArticleUseCase: FindAllArticleUseCase,
    private updateArticleUseCase: UpdateArticleUseCase,
    private registerArticleUseCase: RegisterArticleUseCase,
  ) {}

  @ApiBody({
    schema: zodToOpenAPI(createArticleDtoSchema),
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createArticle(
    @Body(createArticleValidationPipe) body: CreateArticleDtoSchema,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const {
      title,
      knowledgeArea,
      keywords,
      rating,
      language,
      usersIds,
      roles,
      uploadId,
    } = body;

    return await this.createArticleUseCase.execute(
      {
        title,
        knowledgeArea,
        keywords,
        rating,
        language,
        usersIds,
        roles,
        uploadId,
      },
      file,
    );
  }

  @Patch(':id')
  async updateArticle(
    @Param('id') id: string,
    @Body() body: UpdateArticleDtoSchema,
  ) {
    return await this.updateArticleUseCase.execute(id, body);
  }

  @Get(':id')
  async findArticleById(@Param('id') id: string) {
    return await this.findByIdArticleUseCase.execute(id);
  }

  @Get()
  async findAllArticles() {
    return await this.findAllArticleUseCase.execute();
  }

  @Patch('add-user/:id')
  async registerEventById(
    @Param('id') id: string,
    @Body(registerUserInArticleBodyValidationPipe)
    body: RegisterUserInArticleDtoSchema,
  ) {
    console.log(body);
    return await this.registerArticleUseCase.execute(id, body);
  }
}
