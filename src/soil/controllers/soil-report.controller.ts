import { Body, Controller, Get, Post } from '@nestjs/common';
import { SoilReportService } from '../services/soil-report.service';
import { CreateSoilReportDto } from '../dtos/create-soil-report.dto';

@Controller('soil-reports')
export class SoilReportController {
  constructor(private readonly service: SoilReportService) {}

  @Post()
  async create(@Body() dto: CreateSoilReportDto) {
    return this.service.create(dto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }
}
