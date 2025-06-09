// src/soil/services/soil-report-blockwise.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoilReportBlockwise } from '../entities/soil-report-blockwise.entity';
import { Block } from '../entities/block.entity';
import { CreateSoilReportBlockwiseDto } from '../dtos/create-soil-report-blockwise.dto';


@Injectable()
export class SoilReportBlockwiseService {
  constructor(
    @InjectRepository(SoilReportBlockwise)
    private reportRepository: Repository<SoilReportBlockwise>,

    @InjectRepository(Block)
    private blockRepository: Repository<Block>,
  ) {}

  async createReport(blockId: string, data: CreateSoilReportBlockwiseDto) {
    const block = await this.blockRepository.findOne({ where: { block_id: blockId } });
    if (!block) throw new NotFoundException('Block not found');

    const report = this.reportRepository.create({
      ...data,
      timestamp: new Date(data.timestamp),
      block,
    });

    return this.reportRepository.save(report);
  }

  async findAll() {
    return this.reportRepository.find({ relations: ['block'] });
  }

  async findOne(id: string) {
    return this.reportRepository.findOne({ where: { blockwise_report_id: id }, relations: ['block'] });
  }

  async update(id: string, data: Partial<CreateSoilReportBlockwiseDto>) {
  const existing = await this.findOne(id);
  if (!existing) {
    throw new NotFoundException(`Soil report with ID ${id} not found.`);
  }

  const updated = Object.assign(existing, data);
  return this.reportRepository.save(updated);
}
  async delete(id: string) {
    await this.reportRepository.delete(id);
    return { message: 'Deleted successfully' };
  }
}
