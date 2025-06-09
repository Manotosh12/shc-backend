import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from '../entities/district.entity';
import { StateService } from './state.service';
import { Block } from '../entities/block.entity';
import { SoilReportBlockwise } from '../entities/soil-report-blockwise.entity';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District)
    private districtRepository: Repository<District>,

    @InjectRepository(Block)
    private blockRepository: Repository<Block>,

    @InjectRepository(SoilReportBlockwise)
    private soilReportRepository: Repository<SoilReportBlockwise>,

    @Inject(forwardRef(() => StateService))
    private stateService: StateService,
  ) {}

  async createDistrict(data: { district_name: string; state_id: string }): Promise<District> {
    const state = await this.stateService.findOneState(data.state_id);
    const district = this.districtRepository.create({
      district_name: data.district_name,
      state,
    });
    return this.districtRepository.save(district);
  }

  async findAllDistricts(): Promise<District[]> {
    return this.districtRepository.find({
      relations: ['state', 'blocks', 'blocks.soilReports'],
    });
  }

  async findOneDistrict(id: string): Promise<District> {
    const district = await this.districtRepository.findOne({
      where: { district_id: id },
      relations: ['state', 'blocks', 'blocks.soilReports'],
    });

    if (!district) {
      throw new NotFoundException(`District with ID ${id} not found`);
    }

    return district;
  }

  async updateDistrict(
    id: string,
    data: {
      district_name?: string;
      state_id?: string;
      blocks?: { block_name: string }[]; // You can also extend to include soil reports per block
    },
  ): Promise<District> {
    const district = await this.findOneDistrict(id);

    if (data.district_name) {
      district.district_name = data.district_name;
    }

    if (data.state_id) {
      const state = await this.stateService.findOneState(data.state_id);
      district.state = state;
    }

    if (data.blocks) {
      const createdBlocks = data.blocks.map((blockData) =>
        this.blockRepository.create({ block_name: blockData.block_name, district }),
      );
      district.blocks = createdBlocks;
    }

    return this.districtRepository.save(district);
  }

  async deleteDistrict(id: string): Promise<void> {
    const district = await this.findOneDistrict(id);
    await this.districtRepository.remove(district);
  }
}


