import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { StateService } from '../services/state.service';
import { CreateStateDto } from '../dtos/create-state.dto';
import { UpdateStateDto } from '../dtos/update-state.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('states')
@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new state' })
  @ApiBody({ type: CreateStateDto })
  @ApiResponse({ status: 201, description: 'State created successfully' })
  create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.createState(createStateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all states' })
  @ApiResponse({ status: 200, description: 'List of states returned successfully' })
  findAll() {
    return this.stateService.findAllStates();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get state by ID' })
  @ApiParam({ name: 'id', description: 'State ID' })
  @ApiResponse({ status: 200, description: 'State returned successfully' })
  findOne(@Param('id') id: string) {
    return this.stateService.findOneState(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update state by ID' })
  @ApiParam({ name: 'id', description: 'State ID' })
  @ApiBody({ type: UpdateStateDto })
  @ApiResponse({ status: 200, description: 'State updated successfully' })
  update(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
    return this.stateService.updateState(id, updateStateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete state by ID' })
  @ApiParam({ name: 'id', description: 'State ID' })
  @ApiResponse({ status: 200, description: 'State deleted successfully' })
  remove(@Param('id') id: string) {
    return this.stateService.deleteState(id);
  }
}


