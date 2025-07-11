import { 
  BadRequestException, 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Patch, 
  Post, 
  Query 
} from "@nestjs/common";
import { SoilReportStatewiseService } from "../services/soil-report-statewise.service";
import { CreateSoilReportStatewiseDto } from "../dtos/create-soil-report-statewise.dto";
import { UpdateSoilReportStatewiseDto } from "../dtos/update-soil-report-statewise.dto";
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiBody, 
  ApiQuery 
} from '@nestjs/swagger';

@ApiTags('soil-report-statewise')
@Controller('soil-report-statewise')
export class SoilReportStatewiseController {
  constructor(private readonly service: SoilReportStatewiseService) {}

  @Post(':stateId')
  @ApiOperation({ summary: 'Create soil report for a state' })
  @ApiParam({ name: 'stateId', description: 'State ID' })
  @ApiBody({ type: CreateSoilReportStatewiseDto })
  @ApiResponse({ status: 201, description: 'Soil report created successfully' })
  create(
    @Param('stateId') stateId: string,
    @Body() dto: CreateSoilReportStatewiseDto
  ) {
    return this.service.createReport(stateId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all soil reports or filter by stateId (query param)' })
  @ApiQuery({ name: 'stateId', required: false, description: 'Optional state ID to filter reports' })
  @ApiResponse({ status: 200, description: 'Soil reports returned successfully' })
  findAll(@Query('stateId') stateId?: string) {
    if (stateId) {
      return this.service.findByState(stateId);
    }
    return this.service.findAll();
  }

  @Get('state/:stateId')
  @ApiOperation({ summary: 'Get soil reports by stateId' })
  @ApiParam({ name: 'stateId', description: 'State ID' })
  @ApiResponse({ status: 200, description: 'Soil reports for the state returned successfully' })
  findByState(@Param('stateId') stateId: string) {
    return this.service.findByState(stateId);
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
  @ApiBody({ type: UpdateSoilReportStatewiseDto })
  @ApiResponse({ status: 200, description: 'Soil report updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSoilReportStatewiseDto
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
}
   