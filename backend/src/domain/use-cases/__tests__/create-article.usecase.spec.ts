import { IArticleRepository } from '../../repositories/article.repository';
import { CreateArticleUseCase } from '../articles/create-article.usecase';
import { CreateUploadUseCase } from '../uploads/create-upload.usecase';

describe('CreateArticleUseCase', () => {
  let createArticleUseCase: CreateArticleUseCase;
  let articleRepository: IArticleRepository;
  let createUploadUseCase: CreateUploadUseCase;

  beforeEach(() => {
    articleRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      deleteById: jest.fn(),
      update: jest.fn(),
    };

    createArticleUseCase = new CreateArticleUseCase(
      articleRepository,
      createUploadUseCase,
    );
  });

  it('Should create an article', async () => {
    // Arrange
    const createArticleDto = {
      title: 'Test Article',
      keywords: 'English',
      knowledgeArea: 'Test Area',
      language: 'English',
      rating: '{}',
      usersIds: ['user1', 'user2'],
      roles: ['AUTHOR', 'REVIEWER'],
    };

    const createdArticle = {
      id: 'articleId',
      title: 'Test article',
    };

    articleRepository.create(createdArticle);

    await createArticleUseCase.execute(createArticleDto, undefined);

    expect(articleRepository.create).toHaveBeenCalledWith({
      ...createArticleDto,
    });
  });
});
