import { IArticleRepository } from '../../repositories/article.repository';
import { Test } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { FindByIdArticleUseCase } from '../articles/findbyid-article.usecase';

const mockArticleRepository = {
  findById: jest.fn(),
};

describe('FindByIdArticleUseCase', () => {
  let useCase: FindByIdArticleUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FindByIdArticleUseCase,
        { provide: IArticleRepository, useValue: mockArticleRepository },
      ],
    }).compile();

    useCase = module.get<FindByIdArticleUseCase>(FindByIdArticleUseCase);
  });

  it('should find an article by ID', async () => {
    const articleId = '123';
    const expectedArticle = { id: articleId, title: 'Mocked Article' };

    mockArticleRepository.findById.mockResolvedValueOnce(expectedArticle);

    const article = await useCase.execute(articleId);

    expect(article).toEqual(expectedArticle);
  });

  it('should throw BadRequestException if article not found', async () => {
    const nonExistentId = '456';

    mockArticleRepository.findById.mockResolvedValueOnce(null);

    await expect(useCase.execute(nonExistentId)).rejects.toThrow(
      new BadRequestException('Evento não encontrado'),
    );
  });

  // ... additional tests ...
});
