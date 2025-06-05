import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from '../entities/district.entity';
import { DistrictService } from '../services/district.service';
import { DistrictController } from '../controllers/district.controller';

@Module({
  imports: [TypeOrmModule.forFeature([District])],
  providers: [DistrictService],
  controllers: [DistrictController],
})
export class DistrictModule {}
