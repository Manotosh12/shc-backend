import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoilReport } from '../entities/soil-report.entity';
import { CreateSoilReportDto } from '../dtos/create-soil-report.dto';

@Injectable()
export class SoilReportService {
  constructor(
    @InjectRepository(SoilReport)
    private readonly soilReportRepo: Repository<SoilReport>,
  ) {}

  async create(data: CreateSoilReportDto): Promise<SoilReport> {
    const report = this.soilReportRepo.create(data);
    return await this.soilReportRepo.save(report);
  }

  async findAll(): Promise<SoilReport[]> {
    return this.soilReportRepo.find();
  }
}
