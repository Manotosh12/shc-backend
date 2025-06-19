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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('soil-report-blockwise')
@Controller('soil-report-blockwise')
export class SoilReportBlockwiseController {
  constructor(private readonly service: SoilReportBlockwiseService) {}

  @Post(':blockId')
  @ApiOperation({ summary: 'Create soil report for a block' })
  @ApiParam({ name: 'blockId', description: 'Block ID' })
  @ApiBody({ type: CreateSoilReportBlockwiseDto })
  @ApiResponse({ status: 201, description: 'Soil report created successfully' })
  create(
    @Param('blockId') blockId: string,
    @Body() dto: CreateSoilReportBlockwiseDto,
  ) {
    return this.service.createReport(blockId, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all soil reports or filter by districtId or blockId (query params)',
  })
  @ApiQuery({ name: 'districtId', required: false, description: 'Optional district ID to filter reports' })
  @ApiQuery({ name: 'blockId', required: false, description: 'Optional block ID to filter reports' })
  @ApiResponse({ status: 200, description: 'Soil reports returned successfully' })
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
  @ApiOperation({ summary: 'Get soil report by ID' })
  @ApiParam({ name: 'id', description: 'Soil report ID' })
  @ApiResponse({ status: 200, description: 'Soil report returned successfully' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update soil report by ID' })
  @ApiParam({ name: 'id', description: 'Soil report ID' })
  @ApiBody({ type: UpdateSoilReportBlockwiseDto })
  @ApiResponse({ status: 200, description: 'Soil report updated successfully' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSoilReportBlockwiseDto,
  ) {
    if (!Object.keys(dto).length) {
      throw new BadRequestException('No update fields provided.');
    }

    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete soil report by ID' })
  @ApiParam({ name: 'id', description: 'Soil report ID' })
  @ApiResponse({ status: 200, description: 'Soil report deleted successfully' })
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get('district/:districtId')
  @ApiOperation({ summary: 'Get district-wise block report' })
  @ApiParam({ name: 'districtId', description: 'District ID' })
  @ApiResponse({ status: 200, description: 'District-wise block report returned successfully' })
  getStateWiseDistrictData(@Param('districtId') districtId: string) {
    return this.service.getDistrictWiseBlockData(districtId);
  }

  @Get('block/:blockId')
  @ApiOperation({ summary: 'Get block-wise soil report' })
  @ApiParam({ name: 'blockId', description: 'Block ID' })
  @ApiResponse({ status: 200, description: 'Block-wise soil report returned successfully' })
  getBlockWiseReport(@Param('blockId') blockId: string) {
    return this.service.getBlockWiseReport(blockId);
  }
}

