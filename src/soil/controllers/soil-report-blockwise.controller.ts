// src/soil/controllers/soil-report-blockwise.controller.ts
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
import { SoilReportBlockwiseService } from '../services/soil-report-blockwise.service';
import { CreateSoilReportBlockwiseDto } from '../dtos/create-soil-report-blockwise.dto';
import { UpdateSoilReportBlockwiseDto } from '../dtos/update-soil-report-blockwise.dto';

@Controller('soil-report-blockwise')
export class SoilReportBlockwiseController {
  constructor(private readonly service: SoilReportBlockwiseService) {}

  @Post(':blockId')
  create(
    @Param('blockId') blockId: string,
    @Body() dto: CreateSoilReportBlockwiseDto,
  ) {
    return this.service.createReport(blockId, dto);
  }

  @Get()
    findAll(@Query('districtId') districtId?: string, @Query('blockId') blockId?: string) {
      if (districtId) {
        return this.service.findByDistrict(districtId);
      }
      if (blockId) {
        return this.service.findByBlock(blockId);
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
    @Body() dto: UpdateSoilReportBlockwiseDto, // This extends Partial<CreateSoilReportBlockwiseDto>
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

  @Get('district/:districtId/blocks')
  getStateWiseDistrictData(@Param('districtId') districtId: string) {
    return this.service.getDistrictWiseBlockData(districtId);
  }
}

