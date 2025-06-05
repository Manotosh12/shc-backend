
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictResponseDto } from './dto/district-response.dto';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get(':code')
  getDistrictByCode(@Param('code', ParseIntPipe) code: number): Promise<DistrictResponseDto> {
    return this.districtService.findByCode(code);
  }
}
