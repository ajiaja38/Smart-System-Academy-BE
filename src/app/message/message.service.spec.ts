import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageService],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return undefined as the initial message', () => {
    expect(service.getMessage).toBeUndefined();
  });

  it('should set and get the message correctly', () => {
    const testMessage: string = 'Hello, this is the test message';
    service.setMessage(testMessage);
    expect(service.getMessage).toBe(testMessage);
  });
});
