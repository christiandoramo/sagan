import { IArticleRepository } from '../../repositories/article.repository';

import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { RegisterArticleUseCase } from '../articles/register-article.usecase';

const mockArticleRepository = {
  findById: jest.fn(),
  update: jest.fn(),
};

describe('RegisterArticleUseCase', () => {
  let useCase: RegisterArticleUseCase;
  let repository: IArticleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterArticleUseCase,
        { provide: IArticleRepository, useValue: mockArticleRepository },
      ],
    }).compile();

    useCase = module.get<RegisterArticleUseCase>(RegisterArticleUseCase);
    repository = module.get<IArticleRepository>(IArticleRepository);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks for each test
  });

  it('should throw NotFoundException if article does not exist', async () => {
    const nonExistentId = '456';
    const updateData = {};

    mockArticleRepository.findById.mockResolvedValueOnce(null);

    await expect(useCase.execute(nonExistentId, updateData)).rejects.toThrow(
      NotFoundException,
    );
    expect(repository.findById).toHaveBeenCalledWith(nonExistentId);
    expect(repository.update).not.toHaveBeenCalled();
  });
});
