import { Test, TestingModule } from '@nestjs/testing';
import { DistrictService } from './district.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { District } from '../entities/district.entity';
import { Block } from '../entities/block.entity';
import { SoilReportBlockwise } from '../entities/soil-report-blockwise.entity';
import { StateService } from './state.service';
import { NotFoundException } from '@nestjs/common';

describe('DistrictService', () => {
  let service: DistrictService;
  let districtRepository: any;
  let blockRepository: any;
  let soilReportRepository: any;
  let stateService: any;

  const mockDistrict = { district_id: 'd1', district_name: 'District 1', state: { state_id: 's1' }, blocks: [] };
  const mockBlock = { block_id: 'b1', block_name: 'Block A', district: mockDistrict };

  beforeEach(async () => {
    districtRepository = {
      create: jest.fn().mockImplementation(dto => ({ ...dto })),
      save: jest.fn().mockImplementation(district => Promise.resolve({ ...district, district_id: 'd1' })),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };
    blockRepository = {
      create: jest.fn(),
    };
    soilReportRepository = {};
    stateService = {
      findOneState: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DistrictService,
        { provide: getRepositoryToken(District), useValue: districtRepository },
        { provide: getRepositoryToken(Block), useValue: blockRepository },
        { provide: getRepositoryToken(SoilReportBlockwise), useValue: soilReportRepository },
        { provide: StateService, useValue: stateService },
      ],
    }).compile();

    service = module.get<DistrictService>(DistrictService);
  });

  describe('createDistrict', () => {
    it('should create and return a district', async () => {
      stateService.findOneState.mockResolvedValue({ state_id: 's1' });
      districtRepository.create.mockReturnValue({ district_name: 'District 1', state: { state_id: 's1' } });
      districtRepository.save.mockResolvedValue(mockDistrict);

      const result = await service.createDistrict({ district_name: 'District 1', state_id: 's1' });
      expect(result).toEqual(mockDistrict);
      expect(stateService.findOneState).toHaveBeenCalledWith('s1');
      expect(districtRepository.create).toHaveBeenCalledWith({ district_name: 'District 1', state: { state_id: 's1' } });
      expect(districtRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAllDistricts', () => {
    it('should return all districts', async () => {
      districtRepository.find.mockResolvedValue([mockDistrict]);
      const result = await service.findAllDistricts();
      expect(result).toEqual([mockDistrict]);
      expect(districtRepository.find).toHaveBeenCalledWith({ relations: ['state', 'blocks'] });
    });
  });

  describe('findOneDistrict', () => {
    it('should return a district by id', async () => {
      districtRepository.findOne.mockResolvedValue(mockDistrict);
      const result = await service.findOneDistrict('d1');
      expect(result).toEqual(mockDistrict);
      expect(districtRepository.findOne).toHaveBeenCalledWith({ where: { district_id: 'd1' }, relations: ['state', 'blocks'] });
    });

    it('should throw NotFoundException if district not found', async () => {
      districtRepository.findOne.mockResolvedValue(undefined);
      await expect(service.findOneDistrict('d2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateDistrict', () => {
    it('should update district name', async () => {
      districtRepository.findOne.mockResolvedValue({ ...mockDistrict });
      districtRepository.save.mockResolvedValue({ ...mockDistrict, district_name: 'District 2' });

      const result = await service.updateDistrict('d1', { district_name: 'District 2' });
      expect(result.district_name).toBe('District 2');
    });
  });

  describe('deleteDistrict', () => {
    it('should remove a district', async () => {
      districtRepository.findOne.mockResolvedValue(mockDistrict);
      districtRepository.remove.mockResolvedValue(undefined);
      await expect(service.deleteDistrict('d1')).resolves.toBeUndefined();
    });
  });
});
