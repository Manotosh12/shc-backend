import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Block } from '../entities/block.entity';
import { BlockService } from '../services/block.service';
import { BlockController } from '../controllers/block.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Block])],
  providers: [BlockService],
  controllers: [BlockController],
})
export class BlockModule {}
