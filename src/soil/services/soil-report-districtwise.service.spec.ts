import { Test, TestingModule } from '@nestjs/testing';
import { SoilReportDistrictwiseService } from './soil-report-districtwise.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SoilReportDistrictwise } from '../entities/soil-report-districtwise.entity';
import { NotFoundException } from '@nestjs/common';
import { District } from '../entities/district.entity';

describe('SoilReportDistrictwiseService', () => {
  let service: SoilReportDistrictwiseService;
  let repository: any;
  let districtRepository: any;

  const mockReport = {
    id: 'r1',
    district_id: 'd1',
    n: { Low: 46, High: 0, Medium: 0 },
    p: { Low: 46, High: 0, Medium: 0 },
    k: { Low: 46, High: 0, Medium: 0 },
    OC: { Low: 46, High: 0, Medium: 0 },
    pH: { Low: 46, High: 0, Medium: 0 },
    timestamp: '2023-10-01T12:00:00Z',
  };

  beforeEach(async () => {
    repository = {
      create: jest.fn().mockImplementation(dto => ({ ...dto })),
      save: jest.fn().mockImplementation(report => Promise.resolve({ ...report, id: 'r1' })),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };
    districtRepository = {
      findOne: jest.fn().mockResolvedValue({ district_id: 'd1' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SoilReportDistrictwiseService,
        { provide: getRepositoryToken(SoilReportDistrictwise), useValue: repository },
        { provide: getRepositoryToken(District), useValue: districtRepository },
      ],
    }).compile();

    service = module.get<SoilReportDistrictwiseService>(SoilReportDistrictwiseService);
  });

  describe('createReport', () => {
    it('should create and return a soil report', async () => {
      repository.create.mockReturnValue({ ...mockReport });
      // Simulate service returning a Date object for timestamp
      repository.save.mockResolvedValue({ ...mockReport, timestamp: new Date('2023-10-01T12:00:00Z') });
      const result = await service.createReport('d1', mockReport);
      expect(result).toEqual(expect.objectContaining({
        ...mockReport,
        timestamp: expect.any(Date),
      }));
      expect(districtRepository.findOne).toHaveBeenCalledWith({ where: { district_id: 'd1' }, relations: ['state'] });
      expect(repository.create).toHaveBeenCalledWith(expect.objectContaining({
        ...mockReport,
        district: { district_id: 'd1' },
        timestamp: expect.any(Date),
      }));
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all soil reports', async () => {
      repository.find.mockResolvedValue([mockReport]);
      const result = await service.findAll();
      expect(result).toEqual([mockReport]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a soil report by id', async () => {
      repository.findOne.mockResolvedValue(mockReport);
      const result = await service.findOne('r1');
      expect(result).toEqual(mockReport);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { districtwise_report_id: 'r1' }, relations: ['district', 'district.state'] });
    });

    it('should return undefined if not found', async () => {
      repository.findOne.mockResolvedValue(undefined);
      await expect(service.findOne('r2')).resolves.toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update a soil report', async () => {
      repository.findOne.mockResolvedValue({ ...mockReport });
      repository.save.mockResolvedValue({ ...mockReport, n: { Low: 50, High: 0, Medium: 0 } });
      const result = await service.update('r1', { n: { Low: 50, High: 0, Medium: 0 } });
      expect(result.n).toEqual({ Low: 50, High: 0, Medium: 0 });
    });
  });

  describe('delete', () => {
    it('should remove a soil report', async () => {
      repository.findOne.mockResolvedValue(mockReport);
      repository.delete.mockResolvedValue({ affected: 1 });
      await expect(service.delete('r1')).resolves.toEqual({ message: 'Deleted successfully' });
      expect(repository.delete).toHaveBeenCalledWith('r1');
    });
  });
});
