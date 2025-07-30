import { Injectable } from '@nestjs/common';
import { SoilDataDto } from './soil-data.dto';

@Injectable()
export class RecommendationService {
  // ✅ Fertilizer Table (N%, P%, K%)
  private fertilizers = [
    { name: 'Urea', n: 46, p: 0, k: 0 },
    { name: 'DAP', n: 18, p: 46, k: 0 },
    { name: 'SSP', n: 0, p: 16, k: 0 },
    { name: 'MOP', n: 0, p: 0, k: 60 },
    { name: '10:26:26', n: 10, p: 26, k: 26 },
    { name: '12:32:16', n: 12, p: 32, k: 16 },
    { name: '20:20:0', n: 20, p: 20, k: 0 },
  ];

  // ✅ Generic getDominant function
  private getDominant<T extends Record<string, number>>(values: T): string {
    return Object.entries(values).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  }

  private calculateQty(required: number, content: number) {
    return (required / (content / 100)).toFixed(1); // kg/acre
  }

  getRecommendation(data: SoilDataDto) {
    const recommendations: any = {
      main_fertilizers: [],
      alternative_fertilizers: [],
      organic: '',
      ph_correction: '',
    };

    // ✅ Works for both NutrientLevelDto and PHLevelDto
    const nStatus = this.getDominant(data.n);
    const pStatus = this.getDominant(data.p);
    const kStatus = this.getDominant(data.k);
    const ocStatus = this.getDominant(data.OC);
    const phStatus = this.getDominant(data.pH);

    // ✅ Required nutrients (kg/acre)
    const required = {
      n: nStatus === 'Low' ? 20 : nStatus === 'Medium' ? 10 : 0,
      p: pStatus === 'Low' ? 15 : pStatus === 'Medium' ? 8 : 0,
      k: kStatus === 'Low' ? 10 : kStatus === 'Medium' ? 5 : 0,
    };

    // ✅ Find best fertilizers dynamically
    for (const key of ['n', 'p', 'k'] as const) {
      if (required[key] > 0) {
        const available = this.fertilizers
          .filter(f => f[key] > 0)
          .map(f => ({
            name: f.name,
            quantity: `${this.calculateQty(required[key], f[key])} kg/acre`,
            provides: key.toUpperCase(),
          }));

        if (available.length > 0) {
          recommendations.main_fertilizers.push(available[0]); // Best option
          recommendations.alternative_fertilizers.push(...available.slice(1));
        }
      }
    }

    // ✅ Organic Carbon Recommendation
    if (ocStatus === 'Low')
      recommendations.organic = 'Apply 5 tons FYM/compost per acre';
    else if (ocStatus === 'Medium')
      recommendations.organic = 'Apply 2 tons FYM/compost per acre';
    else recommendations.organic = 'No organic amendment required';

    // ✅ pH Correction
    if (phStatus === 'Acidic')
      recommendations.ph_correction = 'Apply 2 qtl/acre Lime';
    else if (phStatus === 'Alkaline')
      recommendations.ph_correction = 'Apply 2 qtl/acre Gypsum';
    else recommendations.ph_correction = 'No pH correction needed';

    return recommendations;
  }
}
