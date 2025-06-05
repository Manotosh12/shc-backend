import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from '../entities/district.entity';
import { CreateDistrictDto } from '../dtos/create-district.dto';
import { UpdateDistrictDto } from '../dtos/update-district.dto';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
  ) {}

  async create(dto: CreateDistrictDto): Promise<District> {
    const district = this.districtRepository.create(dto);
    return this.districtRepository.save(district);
  }

  async findAll(): Promise<District[]> {
    return this.districtRepository.find();
  }

  async findOne(id: string): Promise<District> {
    const district = await this.districtRepository.findOne({ where: { district_id: id } });
    if (!district) {
      throw new NotFoundException(`District with ID ${id} not found`);
    }
    return district;
  }

  async update(id: string, dto: UpdateDistrictDto): Promise<District> {
    const district = await this.findOne(id);
    Object.assign(district, dto);
    return this.districtRepository.save(district);
  }

  async remove(id: string): Promise<void> {
    const result = await this.districtRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`District with ID ${id} not found`);
    }
  }
}
