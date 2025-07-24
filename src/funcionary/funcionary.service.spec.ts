import { Test, TestingModule } from '@nestjs/testing';
import { FuncionaryService } from './funcionary.service';

describe('FuncionaryService', () => {
  let service: FuncionaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuncionaryService],
    }).compile();

    service = module.get<FuncionaryService>(FuncionaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
