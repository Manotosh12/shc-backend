import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoilReportBlockwise } from '../entities/soil-report-blockwise.entity';
import { SoilReportBlockwiseService } from '../services/soil-report-blockwise.service';
import { SoilReportBlockwiseController } from '../controllers/soil-report-blockwise.controller';
import { Block } from '../entities/block.entity';
import { District } from '../entities/district.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SoilReportBlockwise, Block])],
  providers: [SoilReportBlockwiseService],
  controllers: [SoilReportBlockwiseController],
})
export class SoilReportBlockwiseModule {}
