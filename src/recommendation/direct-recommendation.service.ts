import { Injectable } from '@nestjs/common';
import { SoilDirectDto } from './soil-direct.dto';

@Injectable()
export class DirectRecommendationService {
  // ✅ Expanded fertilizer options with N-P-K percentages
  private fertilizers = [
    { name: 'Urea', n: 46, p: 0,  k: 0  },
    { name: 'DAP',  n: 18, p: 46, k: 0  },
    { name: 'SSP',  n: 0,  p: 16, k: 0  },
    { name: 'MOP',  n: 0,  p: 0,  k: 60 },
    { name: '10:26:26', n:10, p:26, k:26 },
    { name: '12:32:16', n:12, p:32, k:16 },
    { name: '20:20:0',  n:20, p:20, k:0  },
    { name: '17:17:17', n:17, p:17, k:17 },
    { name: '19:19:19', n:19, p:19, k:19 },
    { name: 'Complex 15:15:15', n:15, p:15, k:15 },
  ];

  private calcQty(required: number, content: number) {
    return (required / (content / 100)).toFixed(1); // kg/acre
  }

  getRecommendation(data: SoilDirectDto) {
    const rec: any = {
      main_fertilizers: [],
      alternative_fertilizers: [],
      organic: '',
      ph_correction: '',
    };

    // 🎯 Target nutrient levels per acre (adjust as needed)
    const TARGET_N = 300;
    const TARGET_P = 25;
    const TARGET_K = 150;

    // Deficit in kg/acre
    const deficit = {
      n: Math.max(TARGET_N - data.n, 0),
      p: Math.max(TARGET_P - data.p, 0),
      k: Math.max(TARGET_K - data.k, 0),
    };

    // 👉 Choose fertilizers for each nutrient
    for (const key of ['n', 'p', 'k'] as const) {
      if (deficit[key] > 0) {
        const matches = this.fertilizers
          .filter(f => f[key] > 0)
          .map(f => ({
            name: f.name,
            quantity: `${this.calcQty(deficit[key], f[key])} kg/acre`,
            provides: key.toUpperCase(),
          }));
        if (matches.length) {
          rec.main_fertilizers.push(matches[0]);
          rec.alternative_fertilizers.push(...matches.slice(1));
        }
      }
    }

    // 🌱 Organic Carbon advice
    if (data.OC < 0.5) rec.organic = 'Apply 5 tons FYM/compost per acre';
    else if (data.OC < 0.75) rec.organic = 'Apply 2 tons FYM/compost per acre';
    else rec.organic = 'No organic amendment required';

    // ⚖️ pH correction
    if (data.pH < 6.0) rec.ph_correction = 'Apply 2 qtl/acre Lime';
    else if (data.pH > 7.5) rec.ph_correction = 'Apply 2 qtl/acre Gypsum';
    else rec.ph_correction = 'No pH correction needed';

    return rec;
  }
}
