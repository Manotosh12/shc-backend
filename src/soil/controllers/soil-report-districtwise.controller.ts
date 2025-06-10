import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { SoilReportDistrictwiseService } from '../services/soil-report-districtwise.service';
import { CreateSoilReportDistrictwiseDto } from '../dtos/create-soil-report-districtwise.dto';
import { UpdateSoilReportDistrictwiseDto } from '../dtos/update-soil-report-districtwise.dto';

@Controller('soil-report-districtwise')
export class SoilReportDistrictwiseController {
  constructor(private readonly service: SoilReportDistrictwiseService) {}

  @Post(':districtId')
  create(
    @Param('districtId') districtId: string,
    @Body() dto: CreateSoilReportDistrictwiseDto,
  ) {
    return this.service.createReport(districtId, dto);
  }

  @Get()
  findAll(@Query('stateId') stateId?: string, @Query('districtId') districtId?: string) {
    if (stateId) {
      return this.service.findByState(stateId);
    }
    if (districtId) {
      return this.service.findByDistrict(districtId);
    }
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSoilReportDistrictwiseDto,
  ) {
    if (!Object.keys(dto).length) {
      throw new BadRequestException('No update fields provided.');
    }
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get('state/:stateId/districts')
  getStateWiseDistrictData(@Param('stateId') stateId: string) {
    return this.service.getStateWiseDistrictData(stateId);
  }
}
