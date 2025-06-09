import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from '../entities/district.entity';
import { StateModule } from './state.module';
import { DistrictController } from '../controllers/district.controller';
import { DistrictService } from '../services/district.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([District]),
    forwardRef(() => StateModule), // 🔁 Fix circular dependency
  ],
  providers: [DistrictService],
  controllers: [DistrictController],
  exports: [DistrictService], // Optional if needed elsewhere
})
export class DistrictModule {}

