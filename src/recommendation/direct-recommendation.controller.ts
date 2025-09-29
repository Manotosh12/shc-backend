import { Body, Controller, Post } from '@nestjs/common';
import { DirectRecommendationService } from './direct-recommendation.service';
import { SoilDirectDto } from './soil-direct.dto';

@Controller('fertilizer-direct')
export class DirectRecommendationController {
  constructor(private readonly service: DirectRecommendationService) {}

  @Post()
  getRecommendation(@Body() dto: SoilDirectDto) {
    return this.service.getRecommendation(dto);
  }
}
