import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from '../entities/State.entity';
import { District } from '../entities/district.entity';

@Injectable()
export class StateService {
  constructor(
  @InjectRepository(State)
  private stateRepository: Repository<State>,

  @InjectRepository(District)
  private districtRepository: Repository<District>, // ✅ Add this line
) {}


  async createState(data: { state_name: string; districts?: { district_name: string }[] }): Promise<State> {
    const state = this.stateRepository.create({
      state_name: data.state_name,
      districts: data.districts,
    });
    return this.stateRepository.save(state);
  }

  async findAllStates(): Promise<State[]> {
    return this.stateRepository.find({ relations: ['districts'] });
  }

  async findOneState(id: string): Promise<State> {
    const state = await this.stateRepository.findOne({
      where: { state_id: id },
      relations: ['districts'],
    });
    if (!state) {
      throw new NotFoundException(`State with ID ${id} not found`);
    }
    return state;
  }

  async updateState(id: string, data: { state_name?: string; districts?: { district_name: string }[] }): Promise<State> {
  const state = await this.findOneState(id);

  if (data.state_name) {
    state.state_name = data.state_name;
  }

  if (data.districts) {
    state.districts = data.districts.map(d =>
      this.districtRepository.create({ district_name: d.district_name, state }),
    );
  }

  return this.stateRepository.save(state);
}



  async deleteState(id: string): Promise<void> {
    const state = await this.findOneState(id);
    await this.stateRepository.remove(state);
  }
}

