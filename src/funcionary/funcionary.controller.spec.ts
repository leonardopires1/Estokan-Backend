import { Test, TestingModule } from '@nestjs/testing';
import { FuncionaryController } from './funcionary.controller';
import { FuncionaryService } from './funcionary.service';

describe('FuncionaryController', () => {
  let controller: FuncionaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuncionaryController],
      providers: [FuncionaryService],
    }).compile();

    controller = module.get<FuncionaryController>(FuncionaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
