import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from '../entities/State.entity';
import { StateService } from '../services/state.service';
import { StateController } from '../controllers/State.controller';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService], 
})
export class StateModule {}
