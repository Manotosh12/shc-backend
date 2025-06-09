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
} from '@nestjs/common';
import { DistrictService } from '../services/district.service';
import { CreateDistrictDto } from '../dtos/create-district.dto';
import { UpdateDistrictDto } from '../dtos/update-district.dto';

@Controller('districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.createDistrict(createDistrictDto);
  }

  @Get()
  findAll() {
    return this.districtService.findAllDistricts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtService.findOneDistrict(id);
  }

  @Patch(':id')
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
  remove(@Param('id') id: string) {
    return this.districtService.deleteDistrict(id);
  }
}
