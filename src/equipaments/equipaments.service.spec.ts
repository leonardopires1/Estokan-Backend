import { Test, TestingModule } from '@nestjs/testing';
import { EquipamentsService } from './equipaments.service';

describe('EquipamentsService', () => {
  let service: EquipamentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipamentsService],
    }).compile();

    service = module.get<EquipamentsService>(EquipamentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
