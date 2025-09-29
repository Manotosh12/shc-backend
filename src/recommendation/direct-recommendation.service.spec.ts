import { DirectRecommendationService } from './direct-recommendation.service';
import { SoilDirectDto } from './soil-direct.dto';

describe('DirectRecommendationService', () => {
  let service: DirectRecommendationService;

  beforeEach(() => {
    service = new DirectRecommendationService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should recommend main and alternative fertilizers for N, P, K deficit', () => {
    const dto: SoilDirectDto = {
      n: 100, // deficit for N
      p: 10,  // deficit for P
      k: 50,  // deficit for K
      OC: 0.3,
      pH: 7,
    };

    const result = service.getRecommendation(dto);

    expect(result.main_fertilizers.length).toBeGreaterThan(0);
    expect(result.alternative_fertilizers.length).toBeGreaterThan(0);
    expect(result.organic).toContain('FYM');
    expect(result.ph_correction).toBe('No pH correction needed');
  });

  it('should not recommend fertilizers if no deficit', () => {
    const dto: SoilDirectDto = {
      n: 300,
      p: 25,
      k: 150,
      OC: 1,
      pH: 7,
    };

    const result = service.getRecommendation(dto);

    expect(result.main_fertilizers.length).toBe(0);
    expect(result.alternative_fertilizers.length).toBe(0);
    expect(result.organic).toBe('No organic amendment required');
    expect(result.ph_correction).toBe('No pH correction needed');
  });

  it('should recommend lime for low pH', () => {
    const dto: SoilDirectDto = {
      n: 300,
      p: 25,
      k: 150,
      OC: 1,
      pH: 5.5,
    };

    const result = service.getRecommendation(dto);

    expect(result.ph_correction).toBe('Apply 2 qtl/acre Lime');
  });

  it('should recommend gypsum for high pH', () => {
    const dto: SoilDirectDto = {
      n: 300,
      p: 25,
      k: 150,
      OC: 1,
      pH: 8.0,
    };

    const result = service.getRecommendation(dto);

    expect(result.ph_correction).toBe('Apply 2 qtl/acre Gypsum');
  });

  it('should recommend correct organic amendment for OC < 0.5', () => {
    const dto: SoilDirectDto = {
      n: 300,
      p: 25,
      k: 150,
      OC: 0.3,
      pH: 7,
    };

    const result = service.getRecommendation(dto);

    expect(result.organic).toBe('Apply 5 tons FYM/compost per acre');
  });

  it('should recommend correct organic amendment for 0.5 <= OC < 0.75', () => {
    const dto: SoilDirectDto = {
      n: 300,
      p: 25,
      k: 150,
      OC: 0.6,
      pH: 7,
    };

    const result = service.getRecommendation(dto);

    expect(result.organic).toBe('Apply 2 tons FYM/compost per acre');
  });

  it('should recommend no organic amendment for OC >= 0.75', () => {
    const dto: SoilDirectDto = {
      n: 300,
      p: 25,
      k: 150,
      OC: 0.8,
      pH: 7,
    };

    const result = service.getRecommendation(dto);

    expect(result.organic).toBe('No organic amendment required');
  });
});