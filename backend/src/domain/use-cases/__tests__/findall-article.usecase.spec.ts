import { Test } from '@nestjs/testing';
import { IArticleRepository } from '../../repositories/article.repository';
import { FindAllArticleUseCase } from '../articles/findall-article.usecase';

describe('FindAllArticleUseCase', () => {
  let useCase: FindAllArticleUseCase;

  const mockArticleRepository = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FindAllArticleUseCase,
        { provide: IArticleRepository, useValue: mockArticleRepository },
      ],
    }).compile();

    useCase = module.get<FindAllArticleUseCase>(FindAllArticleUseCase);
  });

  it('should return a list of articles', async () => {
    // Hardcode a return value for the mock
    mockArticleRepository.findAll.mockResolvedValueOnce([
      { id: 1, title: 'Article 1' },
    ]);

    const articles = await useCase.execute();

    expect(articles).toEqual([{ id: 1, title: 'Article 1' }]);
  });
});
