import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from '../entities/State.entity';
import { District } from '../entities/district.entity';
import { StateService } from '../services/state.service';
import { StateController } from '../controllers/State.controller';
import { DistrictModule } from './district.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([State, District]),
    forwardRef(() => DistrictModule), // 🔁 Fix circular dependency
  ],
  providers: [StateService],
  controllers: [StateController],
  exports: [StateService], // ✅ Export it for use in DistrictService
})
export class StateModule {}
