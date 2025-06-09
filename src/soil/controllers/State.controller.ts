import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { StateService } from '../services/state.service';

@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  create(@Body() createStateDto: { state_name: string; districts?: { district_name: string }[] }) {
    return this.stateService.createState(createStateDto);
  }

  @Get()
  findAll() {
    return this.stateService.findAllStates();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stateService.findOneState(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStateDto: { state_name?: string; districts?: { district_name: string }[] }) {
    return this.stateService.updateState(id, updateStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stateService.deleteState(id);
  }
}

