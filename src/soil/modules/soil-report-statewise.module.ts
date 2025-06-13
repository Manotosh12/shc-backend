import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoilReportStatewise } from '../entities/soil-report-statewise';
import { State } from '../entities/State.entity';
import { SoilReportStatewiseController } from '../controllers/soil-report-statewise.controller';
import { SoilReportStatewiseService } from '../services/soil-report-statewise.service';

@Module({
  imports: [TypeOrmModule.forFeature([SoilReportStatewise, State])],
  providers: [SoilReportStatewiseService],
  controllers: [SoilReportStatewiseController],
})
export class SoilReportStatetwiseModule {} 