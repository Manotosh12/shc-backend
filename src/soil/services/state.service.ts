import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from '../entities/State.entity';


@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  async findAll(): Promise<State[]> {
    return this.stateRepository.find({
      relations: ['districts', 'districts.soils'],
    });
  }

  async findById(id: number): Promise<State> {
    const state = await this.stateRepository.findOne({
      where: { state_id: id },
      relations: ['districts', 'districts.soils'],
    });
    if (!state) throw new NotFoundException(`State with id ${id} not found`);
    return state;
  }

  async create(stateData: Partial<State>): Promise<State> {
    const state = this.stateRepository.create(stateData);
    return this.stateRepository.save(state);
  }

  async update(id: number, updateData: Partial<State>): Promise<State> {
    const state = await this.findById(id);
    Object.assign(state, updateData);
    return this.stateRepository.save(state);
  }

  async delete(id: number): Promise<void> {
    const state = await this.findById(id);
    await this.stateRepository.remove(state);
  }
}
