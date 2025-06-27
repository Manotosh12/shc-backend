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
    const block = await this.blockRepository.findOne({ where: { block_id: blockId }, relations: ['district'] });
    if (!block) throw new NotFoundException('Block not found');

    const report = this.reportRepository.create({
      ...data,
      timestamp: new Date(data.timestamp),
      block,
    });

    return this.reportRepository.save(report);
  }

  async findAll() {
    return this.reportRepository.find({ relations: ['block','block.district'] });
  }

  async findByBlock(blockId: string) {
    return this.reportRepository.find({
      where: { block: { block_id: blockId } },
      relations: ['block', 'block.district']
    });
  }

  async findByDistrict(districtId: string) {
    return this.reportRepository.find({
      where: { block: { district: { district_id: districtId } } },
      relations: ['block', 'block.district']
    });
  }

  async findOne(id: string) {
    return this.reportRepository.findOne({ where: { blockwise_report_id: id }, relations: ['block','block.district'] });
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

  async getDistrictWiseBlockData(districtId: string) {
    // Get all blocks in the district, including their soil reports
    const blocks = await this.blockRepository.find({
      where: { district: { district_id: districtId } },
      relations: ['district', 'soilReports'],
      order: { block_name: 'ASC' }
    });

    if (!blocks.length) {
      throw new NotFoundException(`No blocks found for district ID ${districtId}`);
    }

    // Format the response to include block-wise soil data
    return blocks.map(block => ({
      block_id: block.block_id,
      block_name: block.block_name,
      district: {
        district_id: block.district.district_id,
        district_name: block.district.district_name
      },
      soil_reports: (block.soilReports || []).map(report => ({
        report_id: report.blockwise_report_id,
        n: report.n,
        p: report.p,
        k: report.k,
        OC: report.OC,
        pH: report.pH,
        timestamp: report.timestamp
      }))
    }));
  }


  async getBlockWiseReport(blockId: string) {
    return this.reportRepository.find({
      where: { block: { block_id: blockId } },
      relations: ['block', 'block.district'],
      order: { timestamp: 'DESC' }
    });
  }

   
}
