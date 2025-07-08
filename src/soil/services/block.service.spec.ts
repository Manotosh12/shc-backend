import { Test, TestingModule } from '@nestjs/testing';
import { BlockService } from './block.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Block } from '../entities/block.entity';
import { District } from '../entities/district.entity';
import { NotFoundException } from '@nestjs/common';

describe('BlockService', () => {
  let service: BlockService;
  let blockRepository: any;
  let districtRepository: any;

  const mockBlock = { block_id: 'b1', block_name: 'Block A', district: { district_id: 'd1' } };
  const mockDistrict = { district_id: 'd1', district_name: 'District 1' };

  beforeEach(async () => {
    blockRepository = {
      create: jest.fn().mockImplementation(dto => ({ ...dto })),
      save: jest.fn().mockImplementation(block => Promise.resolve({ ...block, block_id: 'b1' })),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };
    districtRepository = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlockService,
        { provide: getRepositoryToken(Block), useValue: blockRepository },
        { provide: getRepositoryToken(District), useValue: districtRepository },
      ],
    }).compile();

    service = module.get<BlockService>(BlockService);
  });

  describe('createBlock', () => {
    it('should create and return a block', async () => {
      districtRepository.findOne.mockResolvedValue(mockDistrict);
      blockRepository.create.mockReturnValue({ block_name: 'Block A', district: mockDistrict });
      blockRepository.save.mockResolvedValue({ block_id: 'b1', block_name: 'Block A', district: mockDistrict });

      const result = await service.createBlock({ block_name: 'Block A', district_id: 'd1' });
      expect(result).toEqual({ block_id: 'b1', block_name: 'Block A', district: mockDistrict });
      expect(districtRepository.findOne).toHaveBeenCalledWith({ where: { district_id: 'd1' } });
      expect(blockRepository.create).toHaveBeenCalledWith({ block_name: 'Block A', district: mockDistrict });
      expect(blockRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if district not found', async () => {
      districtRepository.findOne.mockResolvedValue(undefined);
      await expect(service.createBlock({ block_name: 'Block A', district_id: 'd2' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('findBlocksByDistrict', () => {
    it('should return blocks for a district', async () => {
      blockRepository.find.mockResolvedValue([mockBlock]);
      const result = await service.findBlocksByDistrict('d1');
      expect(result).toEqual([mockBlock]);
      expect(blockRepository.find).toHaveBeenCalledWith({
        where: { district: { district_id: 'd1' } },
        relations: ['district'],
        order: { block_name: 'ASC' }
      });
    });
  });

  describe('findAllBlocks', () => {
    it('should return all blocks', async () => {
      blockRepository.find.mockResolvedValue([mockBlock]);
      const result = await service.findAllBlocks();
      expect(result).toEqual([mockBlock]);
      expect(blockRepository.find).toHaveBeenCalledWith({ relations: ['district'] });
    });
  });

  describe('findOneBlock', () => {
    it('should return a block by id', async () => {
      blockRepository.findOne.mockResolvedValue(mockBlock);
      const result = await service.findOneBlock('b1');
      expect(result).toEqual(mockBlock);
      expect(blockRepository.findOne).toHaveBeenCalledWith({
        where: { block_id: 'b1' },
        relations: ['district'],
      });
    });

    it('should throw NotFoundException if block not found', async () => {
      blockRepository.findOne.mockResolvedValue(undefined);
      await expect(service.findOneBlock('b2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateBlock', () => {
    it('should update block name', async () => {
      blockRepository.findOne.mockResolvedValue({ ...mockBlock });
      blockRepository.save.mockResolvedValue({ ...mockBlock, block_name: 'Block B' });

      const result = await service.updateBlock('b1', { block_name: 'Block B' });
      expect(result.block_name).toBe('Block B');
    });

    it('should update district', async () => {
      blockRepository.findOne.mockResolvedValue({ ...mockBlock });
      districtRepository.findOne.mockResolvedValue({ district_id: 'd2', district_name: 'District 2' });
      blockRepository.save.mockResolvedValue({ ...mockBlock, district: { district_id: 'd2', district_name: 'District 2' } });

      const result = await service.updateBlock('b1', { district_id: 'd2' });
      expect(result.district.district_id).toBe('d2');
    });

    it('should throw NotFoundException if new district not found', async () => {
      blockRepository.findOne.mockResolvedValue({ ...mockBlock });
      districtRepository.findOne.mockResolvedValue(undefined);
      await expect(service.updateBlock('b1', { district_id: 'd3' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteBlock', () => {
    it('should remove a block', async () => {
      blockRepository.findOne.mockResolvedValue(mockBlock);
      blockRepository.remove.mockResolvedValue(undefined);
            await expect(service.deleteBlock('b1')).resolves.toBeUndefined();
          });
        });
      });