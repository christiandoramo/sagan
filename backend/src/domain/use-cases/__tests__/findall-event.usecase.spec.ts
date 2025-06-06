import { IEventRepository } from '../../repositories/event.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllEventsUseCase } from '../events/findall-event.usecase';

const mockEventRepository = {
  findAll: jest.fn(),
};

describe('FindAllEventsUseCase', () => {
  let useCase: FindAllEventsUseCase;
  let eventRepository: IEventRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllEventsUseCase,
        { provide: IEventRepository, useValue: mockEventRepository },
      ],
    }).compile();

    useCase = module.get<FindAllEventsUseCase>(FindAllEventsUseCase);
    eventRepository = module.get<IEventRepository>(IEventRepository);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks for each test
  });

  it('should return all events', async () => {
    const expectedEvents = [{ id: 1 }, { id: 2 }];
    mockEventRepository.findAll.mockResolvedValueOnce(expectedEvents);

    const events = await useCase.execute();

    expect(events).toEqual(expectedEvents);
    expect(eventRepository.findAll).toHaveBeenCalled();
  });

  // ... additional tests for edge cases, empty list, etc. ...
});
