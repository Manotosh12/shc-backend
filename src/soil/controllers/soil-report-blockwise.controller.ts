import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSoilReportBlockwiseDto } from '../dtos/create-soil-report-blockwise.dto';
import { SoilReportBlockwiseService } from '../services/soil-report-blockwise.service';

@Controller('soil-reports')
export class SoilReportBlockwiseController {
  constructor(private readonly service: SoilReportBlockwiseService) {}

  @Post()
  async create(@Body() dto: CreateSoilReportBlockwiseDto) {
    return this.service.create(dto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }
}
