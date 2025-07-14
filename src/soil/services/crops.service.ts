import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crops } from '../entities/crops.entity';
import { CreateCropDto } from '../dtos/create-crop.dto';
import { UpdateCropDto } from '../dtos/update-crop.dto';


@Injectable()
export class CropsService {
  constructor(
    @InjectRepository(Crops)
    private cropsRepository: Repository<Crops>,
  ) {}


  async create(createCropDto: CreateCropDto): Promise<Crops> {
    const crop = this.cropsRepository.create(createCropDto);
    return await this.cropsRepository.save(crop);
  }

  
  async findAll(): Promise<Crops[]> {
    return await this.cropsRepository.find();
  }

  
  async findByLocation(state: string, district: string): Promise<Crops[]> {
    return await this.cropsRepository.find({
      where: { state, district },
    });
  }

  
  async update(id: number, updateCropDto: UpdateCropDto): Promise<Crops> {
    const crop = await this.cropsRepository.findOne({ where: { id: 'a-valid-uuid-here' } });
    if (!crop) {
      throw new NotFoundException(`Crop with ID ${id} not found`);
    }

    const updatedCrop = Object.assign(crop, updateCropDto);
    return await this.cropsRepository.save(updatedCrop);
  }

  
  async delete(id: number): Promise<{ message: string }> {
    const result = await this.cropsRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Crop with ID ${id} not found`);
    }
    return { message: `Crop with ID ${id} deleted successfully` };
  }

  
  async deleteByState(state: string): Promise<{ message: string }> {
    const result = await this.cropsRepository.delete({ state });
    if (!result.affected) {
      throw new NotFoundException(`No crops found for state ${state}`);
    }
    return { message: `All crops from ${state} deleted successfully` };
  }
}
