import { Controller, Post, Get, Param, Body, Patch, Delete, Query } from '@nestjs/common';
import { BlockService } from '../services/block.service';


@Controller('blocks')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  create(@Body() body: { block_name: string; district_id: string }) {
    return this.blockService.createBlock(body);
  }

  @Get()
  findAll(@Query('districtId') districtId?: string) {
    if (districtId) {
      return this.blockService.findBlocksByDistrict(districtId);
    }
    return this.blockService.findAllBlocks();
  }

  @Get('district/:districtId')
  getBlocksByDistrict(@Param('districtId') districtId: string) {
    return this.blockService.findBlocksByDistrict(districtId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blockService.findOneBlock(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { block_name?: string; district_id?: string }
  ) {
    return this.blockService.updateBlock(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blockService.deleteBlock(id);
  }
}

