import { RecommendationService } from './recommendation.service';
import { SoilDataDto } from './soil-data.dto';

describe('RecommendationService', () => {
  let service: RecommendationService;

  beforeEach(() => {
    service = new RecommendationService();
  });

  const mockSoilData: SoilDataDto = {
    n: { Low: 40, Medium: 30, High: 20 },
    p: { Low: 30, Medium: 40, High: 10 },
    k: { Low: 20, Medium: 50, High: 10 },
    OC: { Low: 25, Medium: 40, High: 15 },
    pH: { Acidic: 50, Neutral: 30, Alkaline: 20 },
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return recommendations with fertilizers', () => {
    const result = service.getRecommendation(mockSoilData);

    expect(result).toHaveProperty('main_fertilizers');
    expect(result).toHaveProperty('alternative_fertilizers');
    expect(result).toHaveProperty('organic');
    expect(result).toHaveProperty('ph_correction');

    // ✅ Check if fertilizers are suggested
    expect(result.main_fertilizers.length).toBeGreaterThan(0);
    expect(result.main_fertilizers[0]).toHaveProperty('name');
    expect(result.main_fertilizers[0]).toHaveProperty('quantity');
  });

  it('should return proper pH correction for acidic soil', () => {
    const acidicData = { ...mockSoilData, pH: { Acidic: 60, Neutral: 20, Alkaline: 10 } };
    const result = service.getRecommendation(acidicData);

    expect(result.ph_correction).toContain('Lime');
  });

  it('should return proper organic recommendation for low OC', () => {
    const lowOCData = { ...mockSoilData, OC: { Low: 70, Medium: 20, High: 10 } };
    const result = service.getRecommendation(lowOCData);

    expect(result.organic).toContain('FYM');
  });
});
