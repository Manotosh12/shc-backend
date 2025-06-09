import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from '../entities/district.entity';
import { StateModule } from './state.module';
import { DistrictController } from '../controllers/district.controller';
import { DistrictService } from '../services/district.service';
import { State } from '../entities/State.entity';
import { Block } from '../entities/block.entity';
import { SoilReportBlockwise } from '../entities/soil-report-blockwise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([District, State, Block, SoilReportBlockwise]),
    forwardRef(() => StateModule), //  Fix circular dependency
  ],
  providers: [DistrictService],
  controllers: [DistrictController],
  exports: [DistrictService], // Optional if needed elsewhere
})
export class DistrictModule {}

