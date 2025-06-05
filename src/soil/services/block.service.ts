import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Block } from '../entities/block.entity';
import { CreateBlockDto } from '../dtos/create-block.dto';
import { UpdateBlockDto } from '../dtos/update-block.dto';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Block)
    private readonly blockRepository: Repository<Block>,
  ) {}

  async findAll(): Promise<Block[]> {
    return this.blockRepository.find();
  }

  async findOne(id: string): Promise<Block> {
    const block = await this.blockRepository.findOne({ where: { id } });
    if (!block) throw new NotFoundException('Block not found');
    return block;
  }

  async create(createBlockDto: CreateBlockDto): Promise<Block> {
    const block = this.blockRepository.create(createBlockDto);
    return this.blockRepository.save(block);
  }

  async update(id: string, updateBlockDto: UpdateBlockDto): Promise<Block> {
    await this.findOne(id); // ensure it exists
    await this.blockRepository.update(id, updateBlockDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // ensure it exists
    await this.blockRepository.delete(id);
  }
}
