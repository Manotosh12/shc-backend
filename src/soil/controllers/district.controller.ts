import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DistrictService } from '../services/district.service';
import { District } from '../entities/district.entity';
import { CreateDistrictDto } from '../dtos/create-district.dto';
import { UpdateDistrictDto } from '../dtos/update-district.dto';

@Controller('districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateDistrictDto): Promise<District> {
    return this.districtService.create(dto);
  }

  @Get()
  findAll(): Promise<District[]> {
    return this.districtService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<District> {
    return this.districtService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDistrictDto): Promise<District> {
    return this.districtService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.districtService.remove(id);
  }
}
