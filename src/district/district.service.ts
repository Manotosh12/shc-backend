import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from './district.entity';
import { DistrictResponseDto } from './dto/district-response.dto';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District)
    private readonly districtRepo: Repository<District>,
  ) {}

  async findByCode(code: number): Promise<DistrictResponseDto> {
    const district = await this.districtRepo.findOne({
      where: { districtCode: code },
      relations: ['blocks'],
    });
     if (!district) {
    throw new NotFoundException(`District with code ${code} not found`);
  }

    return {
      districtId: district.districtId,
      districtName: district.districtName,
      districtCode: district.districtCode,
      blocks: district.blocks.map(b => ({
        blockId: b.blockId,
        blockName: b.blockName,
      })),
    };
  }
}
