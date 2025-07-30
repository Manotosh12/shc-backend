import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';
import { SoilDataDto } from './soil-data.dto';

describe('RecommendationController', () => {
  let controller: RecommendationController;
  let service: RecommendationService;

  const mockRecommendation = {
    main_fertilizers: [{ name: 'Urea', quantity: '43.5 kg/acre', provides: 'N' }],
    alternative_fertilizers: [],
    organic: 'Apply 5 tons FYM/compost per acre',
    ph_correction: 'Apply 2 qtl/acre Lime',
  };

  const mockSoilData: SoilDataDto = {
    n: { Low: 40, Medium: 30, High: 20 },
    p: { Low: 30, Medium: 40, High: 10 },
    k: { Low: 20, Medium: 50, High: 10 },
    OC: { Low: 25, Medium: 40, High: 15 },
    pH: { Acidic: 50, Neutral: 30, Alkaline: 20 },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommendationController],
      providers: [
        {
          provide: RecommendationService,
          useValue: { getRecommendation: jest.fn().mockReturnValue(mockRecommendation) },
        },
      ],
    }).compile();

    controller = module.get<RecommendationController>(RecommendationController);
    service = module.get<RecommendationService>(RecommendationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service and return recommendation', () => {
    const result = controller.getRecommendation(mockSoilData);

    expect(service.getRecommendation).toHaveBeenCalledWith(mockSoilData);
    expect(result).toEqual(mockRecommendation);
  });
});
