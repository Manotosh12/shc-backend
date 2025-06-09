import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Block } from '../entities/block.entity';
import { District } from '../entities/district.entity';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,

    @InjectRepository(District)
    private districtRepository: Repository<District>
  ) {}

  async createBlock(data: { block_name: string; district_id: string }): Promise<Block> {
    const district = await this.districtRepository.findOne({
      where: { district_id: data.district_id },
    });

    if (!district) {
      throw new NotFoundException('District not found');
    }

    const block = this.blockRepository.create({
      block_name: data.block_name,
      district,
    });

    return this.blockRepository.save(block);
  }

  async findAllBlocks(): Promise<Block[]> {
    return this.blockRepository.find({ relations: ['district'] });
  }

  async findOneBlock(id: string): Promise<Block> {
    const block = await this.blockRepository.findOne({
      where: { block_id: id },
      relations: ['district'],
    });
    if (!block) throw new NotFoundException('Block not found');
    return block;
  }

  async updateBlock(id: string, data: { block_name?: string; district_id?: string }): Promise<Block> {
    const block = await this.findOneBlock(id);

    if (data.block_name) block.block_name = data.block_name;
    if (data.district_id) {
      const district = await this.districtRepository.findOne({
        where: { district_id: data.district_id },
      });
      if (!district) throw new NotFoundException('District not found');
      block.district = district;
    }

    return this.blockRepository.save(block);
  }

  async deleteBlock(id: string): Promise<void> {
    const block = await this.findOneBlock(id);
    await this.blockRepository.remove(block);
  }
}
