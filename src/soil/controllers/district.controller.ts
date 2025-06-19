// src/soil/controllers/district.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { DistrictService } from '../services/district.service';
import { CreateDistrictDto } from '../dtos/create-district.dto';
import { UpdateDistrictDto } from '../dtos/update-district.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('districts')
@Controller('districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new district' })
  @ApiBody({ type: CreateDistrictDto })
  @ApiResponse({ status: 201, description: 'District created successfully' })
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.createDistrict(createDistrictDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all districts or filter by stateId (query param)' })
  @ApiQuery({ name: 'stateId', required: false, description: 'Optional state ID to filter districts' })
  @ApiResponse({ status: 200, description: 'List of districts returned successfully' })
  findAll(@Query('stateId') stateId?: string) {
    if (stateId) {
      return this.districtService.findDistrictsByState(stateId);
    }
    return this.districtService.findAllDistricts();
  }

  @Get('state/:stateId')
  @ApiOperation({ summary: 'Get districts by stateId (path param)' })
  @ApiParam({ name: 'stateId', description: 'State ID' })
  @ApiResponse({ status: 200, description: 'Districts of the state returned successfully' })
  findByState(@Param('stateId') stateId: string) {
    return this.districtService.findDistrictsByState(stateId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get district by ID' })
  @ApiParam({ name: 'id', description: 'District ID' })
  @ApiResponse({ status: 200, description: 'District returned successfully' })
  findOne(@Param('id') id: string) {
    return this.districtService.findOneDistrict(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update district by ID' })
  @ApiParam({ name: 'id', description: 'District ID' })
  @ApiBody({ type: UpdateDistrictDto })
  @ApiResponse({ status: 200, description: 'District updated successfully' })
  update(@Param('id') id: string, @Body() updateDistrictDto: UpdateDistrictDto) {
    if (
      !updateDistrictDto.district_name &&
      !updateDistrictDto.state_id &&
      !updateDistrictDto.blocks
    ) {
      throw new BadRequestException('No update fields provided.');
    }

    return this.districtService.updateDistrict(id, updateDistrictDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete district by ID' })
  @ApiParam({ name: 'id', description: 'District ID' })
  @ApiResponse({ status: 200, description: 'District deleted successfully' })
  remove(@Param('id') id: string) {
    return this.districtService.deleteDistrict(id);
  }
}

