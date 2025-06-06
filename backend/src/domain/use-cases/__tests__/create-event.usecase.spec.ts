import { Test, TestingModule } from '@nestjs/testing';

import { CreateUploadUseCase } from '../uploads/create-upload.usecase';
import { CreateEventUseCase } from '../events/create-event.usecase';
import { IEventRepository } from '../../repositories/event.repository';

// Import other necessary modules, including those for CreateUploadUseCase

const mockEventRepository = {
  create: jest.fn(),
};
const mockCreateUploadUseCase = {
  execute: jest.fn(),
};

let eventRepository: IEventRepository;
let createUploadUseCase: CreateUploadUseCase;
describe('CreateEventUseCase', () => {
  let useCase: CreateEventUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateEventUseCase,
        { provide: IEventRepository, useValue: mockEventRepository },
        { provide: CreateUploadUseCase, useValue: mockCreateUploadUseCase },
        // Other necessary providers for createUploadUseCase
      ],
    }).compile();

    useCase = module.get<CreateEventUseCase>(CreateEventUseCase);
    eventRepository = module.get<IEventRepository>(IEventRepository);
    createUploadUseCase = module.get<CreateUploadUseCase>(CreateUploadUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an event with optional file upload', async () => {
    const expectedEvent = {
      /* mock expected event data */
    };

    mockCreateUploadUseCase.execute.mockResolvedValueOnce({ id: 123 });
    mockEventRepository.create.mockResolvedValueOnce(expectedEvent);

    const createdEvent = await useCase.execute(
      {
        title: 'Test Event',
        // ... other event data
      },
      undefined, // No file
    );

    expect(createdEvent).toEqual(expectedEvent);
    // ... other assertions for repository and upload use case interactions
  });
});
