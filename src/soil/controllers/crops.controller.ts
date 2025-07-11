import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CropsService } from '../services/crops.service';
import { CreateCropDto } from '../dtos/create-crop.dto';
import { UpdateCropDto } from '../dtos/update-crop.dto';

@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
  create(@Body() createCropDto: CreateCropDto) {
    return this.cropsService.create(createCropDto);
  }

  @Get()
  findAll() {
    return this.cropsService.findAll();
  }

  @Get('location/:state/:district')
  findByLocation(
    @Param('state') state: string,
    @Param('district') district: string,
  ) {
    return this.cropsService.findByLocation(state, district);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCropDto: UpdateCropDto,
  ) {
    return this.cropsService.update(id, updateCropDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.cropsService.delete(id);
  }

  @Delete('delete/by-state/:state')
  deleteByState(@Param('state') state: string) {
    return this.cropsService.deleteByState(state);
  }
}
