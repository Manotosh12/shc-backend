import { Controller, Get, Post, Body, Param, Patch, Delete, BadRequestException } from '@nestjs/common';
import { DistrictService } from '../services/district.service';

@Controller('districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post()
  create(@Body() createDistrictDto: { district_name: string; state_id: string }) {
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
  update(
    @Param('id') id: string,
    @Body() updateDistrictDto: { district_name?: string; state_id?: string } // ✅ ensure this is defined
  ) {
    return this.districtService.updateDistrict(id, updateDistrictDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtService.deleteDistrict(id);
  }
}

