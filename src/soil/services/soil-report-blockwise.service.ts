import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoilReportBlockwise } from '../entities/soil-report-blockwise.entity';
import { CreateSoilReportBlockwiseDto } from '../dtos/create-soil-report-blockwise.dto';

@Injectable()
export class SoilReportBlockwiseService {
  constructor(
    @InjectRepository(SoilReportBlockwise)
    private readonly soilReportRepo: Repository<SoilReportBlockwise>,
  ) {}

  async create(data: CreateSoilReportBlockwiseDto): Promise<SoilReportBlockwise> {
    const report = this.soilReportRepo.create(data);
    return await this.soilReportRepo.save(report);
  }

  async findAll(): Promise<SoilReportBlockwise[]> {
    return this.soilReportRepo.find();
  }
}
