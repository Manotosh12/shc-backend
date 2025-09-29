import { Module } from '@nestjs/common';
import { DirectRecommendationService } from './direct-recommendation.service';
import { DirectRecommendationController } from './direct-recommendation.controller';

@Module({
  providers: [DirectRecommendationService],
  controllers: [DirectRecommendationController],
})
export class DirectRecommendationModule {}
