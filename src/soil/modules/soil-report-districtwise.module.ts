import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoilReportDistrictwise } from '../entities/soil-report-districtwise.entity';
import { SoilReportDistrictwiseService } from '../services/soil-report-districtwise.service';
import { SoilReportDistrictwiseController } from '../controllers/soil-report-districtwise.controller';
import { District } from '../entities/district.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SoilReportDistrictwise, District])],
  providers: [SoilReportDistrictwiseService],
  controllers: [SoilReportDistrictwiseController],
})
export class SoilReportDistrictwiseModule {} 