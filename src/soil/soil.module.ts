import { Module } from '@nestjs/common';
import { SoilService } from './soil.service';
import { SoilController } from './soil.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nutrient } from './entities/nutrient.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Nutrient])],
  controllers: [SoilController],
  providers: [SoilService],
})
export class SoilModule {}
