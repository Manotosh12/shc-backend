import { Controller, Post, Get, Param, Body, Patch, Delete, Query } from '@nestjs/common';
import { BlockService } from '../services/block.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBlockDto } from '../dtos/create-block.dto';
import { UpdateBlockDto } from '../dtos/update-block.dto';


@ApiTags('Blocks')  // Grouping API endpoints under "Blocks"
@Controller('blocks')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new block' })
  @ApiBody({ type: CreateBlockDto })
  @ApiResponse({ status: 201, description: 'Block created successfully' })
  create(@Body() body: CreateBlockDto) {
    const { block_name, district_id } = body;
    return this.blockService.createBlock({ block_name, district_id });
  }

  @Get()
  @ApiOperation({ summary: 'Get all blocks or blocks by districtId (query param)' })
  @ApiQuery({ name: 'districtId', required: false, description: 'Optional district ID to filter blocks' })
  @ApiResponse({ status: 200, description: 'List of blocks returned successfully' })
  findAll(@Query('districtId') districtId?: string) {
    if (districtId) {
      return this.blockService.findBlocksByDistrict(districtId);
    }
    return this.blockService.findAllBlocks();
  }

  @Get('district/:districtId')
  @ApiOperation({ summary: 'Get blocks by districtId (path param)' })
  @ApiParam({ name: 'districtId', description: 'District ID' })
  @ApiResponse({ status: 200, description: 'Blocks of the district returned successfully' })
  getBlocksByDistrict(@Param('districtId') districtId: string) {
    return this.blockService.findBlocksByDistrict(districtId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get block by ID' })
  @ApiParam({ name: 'id', description: 'Block ID' })
  @ApiResponse({ status: 200, description: 'Block returned successfully' })
  findOne(@Param('id') id: string) {
    return this.blockService.findOneBlock(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update block by ID' })
  @ApiParam({ name: 'id', description: 'Block ID' })
  @ApiBody({ type: UpdateBlockDto })
  @ApiResponse({ status: 200, description: 'Block updated successfully' })
  update(@Param('id') id: string, @Body() body: UpdateBlockDto) {
    return this.blockService.updateBlock(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete block by ID' })
  @ApiParam({ name: 'id', description: 'Block ID' })
  @ApiResponse({ status: 200, description: 'Block deleted successfully' })
  remove(@Param('id') id: string) {
    return this.blockService.deleteBlock(id);
  }
}

