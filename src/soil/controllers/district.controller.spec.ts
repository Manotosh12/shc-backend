import { Test, TestingModule } from '@nestjs/testing';
import { DistrictController } from './district.controller';
import { DistrictService } from '../services/district.service';
import { CreateDistrictDto } from '../dtos/create-district.dto';
import { UpdateDistrictDto } from '../dtos/update-district.dto';
import { NotFoundException } from '@nestjs/common';

describe('DistrictController', () => {
  let controller: DistrictController;
  let service: DistrictService;

  const mockDistrict = { district_id: 'd1', district_name: 'District 1', state: { state_id: 's1' }, blocks: [] };

  const mockDistrictService = {
    createDistrict: jest.fn(),
    findAllDistricts: jest.fn(),
    findOneDistrict: jest.fn(),
    updateDistrict: jest.fn(),
    deleteDistrict: jest.fn(),
    findDistrictsByState: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistrictController],
      providers: [
        { provide: DistrictService, useValue: mockDistrictService },
      ],
    }).compile();

    controller = module.get<DistrictController>(DistrictController);
    service = module.get<DistrictService>(DistrictService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a district', async () => {
      const dto: CreateDistrictDto = { district_name: 'District 1', state_id: 's1' };
      mockDistrictService.createDistrict.mockResolvedValue(mockDistrict);
      const result = await controller.create(dto);
      expect(result).toEqual(mockDistrict);
      expect(service.createDistrict).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all districts', async () => {
      mockDistrictService.findAllDistricts.mockResolvedValue([mockDistrict]);
      const result = await controller.findAll();
      expect(result).toEqual([mockDistrict]);
      expect(service.findAllDistricts).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a district by id', async () => {
      mockDistrictService.findOneDistrict.mockResolvedValue(mockDistrict);
      const result = await controller.findOne('d1');
      expect(result).toEqual(mockDistrict);
      expect(service.findOneDistrict).toHaveBeenCalledWith('d1');
    });

    it('should throw NotFoundException if not found', async () => {
      mockDistrictService.findOneDistrict.mockRejectedValue(new NotFoundException());
      await expect(controller.findOne('d2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a district', async () => {
      const dto: UpdateDistrictDto = { district_name: 'District 2' };
      mockDistrictService.updateDistrict.mockResolvedValue({ ...mockDistrict, district_name: 'District 2' });
      const result = await controller.update('d1', dto);
      expect(result.district_name).toBe('District 2');
      expect(service.updateDistrict).toHaveBeenCalledWith('d1', dto);
    });
  });

  describe('remove', () => {
    it('should delete a district', async () => {
      mockDistrictService.deleteDistrict.mockResolvedValue(undefined);
      await expect(controller.remove('d1')).resolves.toBeUndefined();
      expect(service.deleteDistrict).toHaveBeenCalledWith('d1');
    });
  });
});
