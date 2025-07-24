import { Test, TestingModule } from '@nestjs/testing';
import { EquipamentsController } from './equipaments.controller';
import { EquipamentsService } from './equipaments.service';

describe('EquipamentsController', () => {
  let controller: EquipamentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipamentsController],
      providers: [EquipamentsService],
    }).compile();

    controller = module.get<EquipamentsController>(EquipamentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
