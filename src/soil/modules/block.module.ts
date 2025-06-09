import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Block } from '../entities/block.entity';
import { BlockService } from '../services/block.service';
import { BlockController } from '../controllers/block.controller';
import { District } from '../entities/district.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Block, District])],
  providers: [BlockService],
  controllers: [BlockController],
})
export class BlockModule {}
