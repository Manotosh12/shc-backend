import { Test, TestingModule } from '@nestjs/testing';
import { SoilReportStatewiseService } from './soil-report-statewise.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SoilReportStatewise } from '../entities/soil-report-statewise';
import { State } from '../entities/State.entity';
import { NotFoundException } from '@nestjs/common';

describe('SoilReportStatewiseService', () => {
  let service: SoilReportStatewiseService;
  let reportRepository: any;
  let stateRepository: any;

  const mockState = { state_id: 's1', state_name: 'State 1' };
  const mockReport = {
    statewise_report_id: 'r1',
    n: { Low: 1 },
    p: { Low: 2 },
    k: { Low: 3 },
    OC: { Low: 4 },
    pH: { Low: 5 },
    timestamp: new Date(),
    state: mockState
  };

  beforeEach(async () => {
    reportRepository = {
      create: jest.fn().mockImplementation(dto => ({ ...dto })),
      save: jest.fn().mockImplementation(report => Promise.resolve({ ...report, statewise_report_id: 'r1' })),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    };
    stateRepository = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SoilReportStatewiseService,
        { provide: getRepositoryToken(SoilReportStatewise), useValue: reportRepository },
        { provide: getRepositoryToken(State), useValue: stateRepository },
      ],
    }).compile();

    service = module.get<SoilReportStatewiseService>(SoilReportStatewiseService);
  });

  describe('createReport', () => {
    it('should create and return a report', async () => {
      stateRepository.findOne.mockResolvedValue(mockState);
      reportRepository.create.mockReturnValue({ ...mockReport, state: mockState });
      reportRepository.save.mockResolvedValue({ ...mockReport, state: mockState });

      const dto = { n: {}, p: {}, k: {}, OC: {}, pH: {}, timestamp: new Date().toISOString() };
      const result = await service.createReport('s1', dto);
      expect(result.statewise_report_id).toBe('r1');
      expect(stateRepository.findOne).toHaveBeenCalledWith({ where: { state_id: 's1' } });
      expect(reportRepository.create).toHaveBeenCalled();
      expect(reportRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if state not found', async () => {
      stateRepository.findOne.mockResolvedValue(undefined);
      await expect(service.createReport('s2', {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByState', () => {
    it('should return reports for a state', async () => {
      reportRepository.find.mockResolvedValue([mockReport]);
      const result = await service.findByState('s1');
      expect(result).toEqual([mockReport]);
      expect(reportRepository.find).toHaveBeenCalledWith({
        where: { state: { state_id: 's1' } },
        relations: ['state'],
        order: { timestamp: 'DESC' }
      });
    });
  });

  describe('findAll', () => {
    it('should return all reports', async () => {
      reportRepository.find.mockResolvedValue([mockReport]);
      const result = await service.findAll();
      expect(result).toEqual([mockReport]);
      expect(reportRepository.find).toHaveBeenCalledWith({
        relations: ['state'],
        order: { timestamp: 'DESC' }
      });
    });
  });

  describe('findOne', () => {
    it('should return a report by id', async () => {
      reportRepository.findOne.mockResolvedValue(mockReport);
      const result = await service.findOne('r1');
      expect(result).toEqual(mockReport);
      expect(reportRepository.findOne).toHaveBeenCalledWith({
        where: { statewise_report_id: 'r1' },
        relations: ['state']
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
});