import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crops } from '../entities/crops.entity';
import { CropsService } from '../services/crops.service';
import { CropsController } from '../controllers/crops.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Crops])],
  providers: [CropsService],
  controllers: [CropsController],
})
export class CropsModule {}
