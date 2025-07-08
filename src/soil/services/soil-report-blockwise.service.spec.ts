import { Test, TestingModule } from '@nestjs/testing';
import { SoilReportBlockwiseService } from './soil-report-blockwise.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SoilReportBlockwise } from '../entities/soil-report-blockwise.entity';
import { Block } from '../entities/block.entity';
import { NotFoundException } from '@nestjs/common';

describe('SoilReportBlockwiseService', () => {
  let service: SoilReportBlockwiseService;
  let reportRepository: any;
  let blockRepository: any;

  const mockBlock = {
    block_id: 'b1',
    block_name: 'Block 1',
    district: { district_id: 'd1', district_name: 'District 1' },
    soilReports: []
  };

  const mockReport = {
    blockwise_report_id: 'r1',
    n: { Low: 1 },
    p: { Low: 2 },
    k: { Low: 3 },
    OC: { Low: 4 },
    pH: { Low: 5 },
    timestamp: new Date(),
    block: mockBlock
  };

  beforeEach(async () => {
    reportRepository = {
      create: jest.fn().mockImplementation(dto => ({ ...dto })),
      save: jest.fn().mockImplementation(report => Promise.resolve({ ...report, blockwise_report_id: 'r1' })),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    };
    blockRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SoilReportBlockwiseService,
        { provide: getRepositoryToken(SoilReportBlockwise), useValue: reportRepository },
        { provide: getRepositoryToken(Block), useValue: blockRepository },
      ],
    }).compile();

    service = module.get<SoilReportBlockwiseService>(SoilReportBlockwiseService);
  });

  describe('createReport', () => {
    it('should create and return a report', async () => {
      blockRepository.findOne.mockResolvedValue(mockBlock);
      reportRepository.create.mockReturnValue({ ...mockReport, block: mockBlock });
      reportRepository.save.mockResolvedValue({ ...mockReport, block: mockBlock });

      const dto = { n: {}, p: {}, k: {}, OC: {}, pH: {}, timestamp: new Date().toISOString() };
      const result = await service.createReport('b1', dto);
      expect(result.blockwise_report_id).toBe('r1');
      expect(blockRepository.findOne).toHaveBeenCalledWith({ where: { block_id: 'b1' }, relations: ['district'] });
      expect(reportRepository.create).toHaveBeenCalled();
      expect(reportRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if block not found', async () => {
      blockRepository.findOne.mockResolvedValue(undefined);
      await expect(service.createReport('b2', {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all reports', async () => {
      reportRepository.find.mockResolvedValue([mockReport]);
      const result = await service.findAll();
      expect(result).toEqual([mockReport]);
      expect(reportRepository.find).toHaveBeenCalledWith({ relations: ['block','block.district'] });
    });
  });

  describe('findByBlock', () => {
    it('should return reports for a block', async () => {
      reportRepository.find.mockResolvedValue([mockReport]);
      const result = await service.findByBlock('b1');
      expect(result).toEqual([mockReport]);
      expect(reportRepository.find).toHaveBeenCalledWith({
        where: { block: { block_id: 'b1' } },
        relations: ['block', 'block.district']
      });
    });
  });

  describe('findByDistrict', () => {
    it('should return reports for a district', async () => {
      reportRepository.find.mockResolvedValue([mockReport]);
      const result = await service.findByDistrict('d1');
      expect(result).toEqual([mockReport]);
      expect(reportRepository.find).toHaveBeenCalledWith({
        where: { block: { district: { district_id: 'd1' } } },
        relations: ['block', 'block.district']
      });
    });
  });

  describe('findOne', () => {
    it('should return a report by id', async () => {
      reportRepository.findOne.mockResolvedValue(mockReport);
      const result = await service.findOne('r1');
      expect(result).toEqual(mockReport);
      expect(reportRepository.findOne).toHaveBeenCalledWith({
        where: { blockwise_report_id: 'r1' },
        relations: ['block','block.district']
      });
    });
  });

  describe('update', () => {
    it('should update a report', async () => {
      reportRepository.findOne.mockResolvedValue({ ...mockReport });
      reportRepository.save.mockResolvedValue({ ...mockReport, n: { Low: 99 } });

      const result = await service.update('r1', { n: { Low: 99 } });
      expect(result.n.Low).toBe(99);
    });

    it('should throw NotFoundException if report not found', async () => {
      reportRepository.findOne.mockResolvedValue(undefined);
      await expect(service.update('r2', { n: { Low: 99 } })).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a report', async () => {
      reportRepository.delete.mockResolvedValue({ affected: 1 });
      const result = await service.delete('r1');
      expect(result).toEqual({ message: 'Deleted successfully' });
      expect(reportRepository.delete).toHaveBeenCalledWith('r1');
    });
  });

  describe('getDistrictWiseBlockData', () => {
    it('should return formatted block-wise soil data', async () => {
      const soilReport = { ...mockReport, block: undefined };
      const blockWithReports = {
        ...mockBlock,
        soilReports: [soilReport]
      };
      blockRepository.find.mockResolvedValue([blockWithReports]);
      const result = await service.getDistrictWiseBlockData('d1');
      expect(result[0].block_id).toBe('b1');
      expect(result[0].soil_reports.length).toBe(1);
    });

    it('should throw NotFoundException if no blocks found', async () => {
      blockRepository.find.mockResolvedValue([]);
      await expect(service.getDistrictWiseBlockData('d2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getBlockWiseReport', () => {
    it('should return block-wise reports', async () => {
      reportRepository.find.mockResolvedValue([mockReport]);
      const result = await service.getBlockWiseReport('b1');
      expect(result).toEqual([mockReport]);
      expect(reportRepository.find).toHaveBeenCalledWith({
        where: { block: { block_id: 'b1' } },
        relations: ['block', 'block.district'],
        order: { timestamp: 'DESC' }
      });
    });
  });
});