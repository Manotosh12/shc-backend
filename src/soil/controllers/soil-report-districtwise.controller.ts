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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('soil-report-districtwise')
@Controller('soil-report-districtwise')
export class SoilReportDistrictwiseController {
  constructor(private readonly service: SoilReportDistrictwiseService) {}

  @Post(':districtId')
  @ApiOperation({ summary: 'Create soil report for a district' })
  @ApiParam({ name: 'districtId', description: 'District ID' })
  @ApiBody({ type: CreateSoilReportDistrictwiseDto })
  @ApiResponse({ status: 201, description: 'Soil report created successfully' })
  create(
    @Param('districtId') districtId: string,
    @Body() dto: CreateSoilReportDistrictwiseDto,
  ) {
    return this.service.createReport(districtId, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all soil reports or filter by stateId or districtId (query params)',
  })
  @ApiQuery({ name: 'stateId', required: false, description: 'Optional state ID to filter reports' })
  @ApiQuery({ name: 'districtId', required: false, description: 'Optional district ID to filter reports' })
  @ApiResponse({ status: 200, description: 'Soil reports returned successfully' })
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
  @ApiOperation({ summary: 'Get soil report by ID' })
  @ApiParam({ name: 'id', description: 'Soil report ID' })
  @ApiResponse({ status: 200, description: 'Soil report returned successfully' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update soil report by ID' })
  @ApiParam({ name: 'id', description: 'Soil report ID' })
  @ApiBody({ type: UpdateSoilReportDistrictwiseDto })
  @ApiResponse({ status: 200, description: 'Soil report updated successfully' })
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
  @ApiOperation({ summary: 'Delete soil report by ID' })
  @ApiParam({ name: 'id', description: 'Soil report ID' })
  @ApiResponse({ status: 200, description: 'Soil report deleted successfully' })
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get('state/:stateId')
  @ApiOperation({ summary: 'Get state-wise district soil report' })
  @ApiParam({ name: 'stateId', description: 'State ID' })
  @ApiResponse({ status: 200, description: 'State-wise district soil report returned successfully' })
  getStateWiseDistrictData(@Param('stateId') stateId: string) {
    return this.service.getStateWiseDistrictData(stateId);
  }

  @Get('district/:districtId')
  @ApiOperation({ summary: 'Get district-wise soil report' })
  @ApiParam({ name: 'districtId', description: 'District ID' })
  @ApiResponse({ status: 200, description: 'District-wise soil report returned successfully' })
  getDistrictWiseReport(@Param('districtId') districtId: string) {
    return this.service.getDistrictWiseReport(districtId);
  }
}
