import { Controller, Post, Body } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { SoilDataDto } from './soil-data.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Recommendation')
@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Post()
  @ApiBody({ type: SoilDataDto })
  getRecommendation(@Body() soilData: SoilDataDto) {
    return this.recommendationService.getRecommendation(soilData);
  }
}
