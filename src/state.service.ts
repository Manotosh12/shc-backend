import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  findAll() {
    return this.stateRepository.find({ relations: ['districts'] });
  }

  findByCode(code: number) {
    return this.stateRepository.findOne({
      where: { stateCode: code },
      relations: ['districts'],
    });
  }
}
