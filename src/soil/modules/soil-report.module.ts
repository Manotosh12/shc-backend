import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoilReport } from '../entities/soil-report.entity';
import { SoilReportService } from '../services/soil-report.service';
import { SoilReportController } from '../controllers/soil-report.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SoilReport])],
  providers: [SoilReportService],
  controllers: [SoilReportController],
})
export class SoilReportModule {}
