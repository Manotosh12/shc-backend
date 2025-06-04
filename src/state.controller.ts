import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StateService } from './state.service';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  getAllStates() {
    return this.stateService.findAll(); 
  }

  @Get(':code')
  getStateByCode(@Param('code', ParseIntPipe) code: number) {
    return this.stateService.findByCode(code); 
  }
}
