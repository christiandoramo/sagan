import { IArticleRepository } from '../../repositories/article.repository';

import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UpdateArticleUseCase } from '../articles/update-article.usecase';
import { UpdateArticleDtoSchema } from '../../../http/controllers/article.controller';

const mockArticleRepository = {
  update: jest.fn(),
};

describe('UpdateArticleUseCase', () => {
  let useCase: UpdateArticleUseCase;
  let repository: IArticleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateArticleUseCase,
        { provide: IArticleRepository, useValue: mockArticleRepository },
      ],
    }).compile();

    useCase = module.get<UpdateArticleUseCase>(UpdateArticleUseCase);
    repository = module.get<IArticleRepository>(IArticleRepository);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks for each test
  });

  it('should update an article (successful update)', async () => {
    const existingArticleId = '123';
    const updateData: any = {
      title: 'Updated Title',
      keywords: ['keyword1', 'keyword2'],
      knowledgeArea: 'Machine Learning',
      language: 'en',
      usersIds: ['user1', 'user2'],
      roles: ['admin', 'editor'],
      rating: 5,
    };
    const expectedUpdatedArticle = {
      id: existingArticleId,
      ...updateData,
    };

    mockArticleRepository.update.mockResolvedValueOnce(expectedUpdatedArticle);

    const updatedArticle = await useCase.execute(existingArticleId, updateData);

    expect(updatedArticle).toEqual(expectedUpdatedArticle);
    expect(repository.update).toHaveBeenCalledWith(
      existingArticleId,
      updateData,
    );
  });

  it('should re-throw repository errors as BadRequestException', async () => {
    const existingArticleId = '456';
    const updateData: UpdateArticleDtoSchema = {}; // Replace with actual data
    const error = new Error('Simulated repository error');

    mockArticleRepository.update.mockRejectedValueOnce(error);

    await expect(
      useCase.execute(existingArticleId, updateData),
    ).rejects.toThrow(BadRequestException);
    expect(repository.update).toHaveBeenCalledWith(
      existingArticleId,
      updateData,
    );
  });
});
