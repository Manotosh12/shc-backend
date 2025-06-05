import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { StateService } from '../services/state.service';
import { State } from '../entities/State.entity';
import { CreateStateDto } from '../dtos/create-state.dto';
import { UpdateStateDto } from '../dtos/update-state.dto';


@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async getAllStates(): Promise<State[]> {
    return this.stateService.findAll();
  }

  @Get(':id')
  async getStateById(@Param('id', ParseIntPipe) id: number): Promise<State> {
    return this.stateService.findById(id);
  }

  @Post()
  async createState(@Body() stateData: CreateStateDto): Promise<State> {
    return this.stateService.create(stateData);
  }

  @Put(':id')
  async updateState(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateStateDto,
  ): Promise<State> {
    return this.stateService.update(id, updateData);
  }

  @Delete(':id')
  async deleteState(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.stateService.delete(id);
    return { message: `State with id ${id} deleted successfully` };
  }
}
