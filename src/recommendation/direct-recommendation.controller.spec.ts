import { Test, TestingModule } from '@nestjs/testing';
import { DirectRecommendationController } from './direct-recommendation.controller';
import { DirectRecommendationService } from './direct-recommendation.service';
import { SoilDirectDto } from './soil-direct.dto';

describe('DirectRecommendationController', () => {
  let controller: DirectRecommendationController;
  let service: DirectRecommendationService;

  const mockService = {
    getRecommendation: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectRecommendationController],
      providers: [
        {
          provide: DirectRecommendationService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<DirectRecommendationController>(DirectRecommendationController);
    service = module.get<DirectRecommendationService>(DirectRecommendationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.getRecommendation with dto and return result', async () => {
    const dto: SoilDirectDto = {
      n: 10,
      p: 20,
      k: 30,
      OC: 0.5,
      pH: 7,
    };
    const expectedResult = { recommendation: 'test' };
    mockService.getRecommendation.mockResolvedValue(expectedResult);

    const result = await controller.getRecommendation(dto);

    expect(service.getRecommendation).toHaveBeenCalledWith(dto);
    expect(result).toBe(expectedResult);
    });
});