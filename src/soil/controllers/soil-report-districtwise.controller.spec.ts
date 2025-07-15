import { Test, TestingModule } from '@nestjs/testing';
import { SoilReportDistrictwiseController } from './soil-report-districtwise.controller';
import { SoilReportDistrictwiseService } from '../services/soil-report-districtwise.service';
import { NotFoundException } from '@nestjs/common';

describe('SoilReportDistrictwiseController', () => {
  let controller: SoilReportDistrictwiseController;
  let service: SoilReportDistrictwiseService;

  const mockReport = { id: 'r1', district_id: 'd1', data: 'Sample Data' };

  const mockService = {
    createReport: jest.fn(),
    findAll: jest.fn(),
    findByState: jest.fn(),
    findByDistrict: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoilReportDistrictwiseController],
      providers: [
        { provide: SoilReportDistrictwiseService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<SoilReportDistrictwiseController>(SoilReportDistrictwiseController);
    service = module.get<SoilReportDistrictwiseService>(SoilReportDistrictwiseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a soil report', async () => {
      mockService.createReport.mockResolvedValue(mockReport);
      const dto = {
        n: { Low: 46, High: 0, Medium: 0 },
        p: { Low: 46, High: 0, Medium: 0 },
        k: { Low: 46, High: 0, Medium: 0 },
        OC: { Low: 46, High: 0, Medium: 0 },
        pH: { Low: 46, High: 0, Medium: 0 },
        timestamp: '2023-10-01T12:00:00Z',
      };
      const result = await controller.create('d1', dto);
      expect(result).toEqual(mockReport);
      expect(service.createReport).toHaveBeenCalledWith('d1', dto);
    });
  });

  describe('findAll', () => {
    it('should return all soil reports', async () => {
      mockService.findAll.mockResolvedValue([mockReport]);
      const result = await controller.findAll();
      expect(result).toEqual([mockReport]);
      expect(service.findAll).toHaveBeenCalled();
    });
    it('should return soil reports by stateId', async () => {
      mockService.findByState.mockResolvedValue([mockReport]);
      const result = await controller.findAll('s1');
      expect(result).toEqual([mockReport]);
      expect(service.findByState).toHaveBeenCalledWith('s1');
    });
    it('should return soil reports by districtId', async () => {
      mockService.findByDistrict.mockResolvedValue([mockReport]);
      const result = await controller.findAll(undefined, 'd1');
      expect(result).toEqual([mockReport]);
      expect(service.findByDistrict).toHaveBeenCalledWith('d1');
    });
  });

  describe('findOne', () => {
    it('should return a soil report by id', async () => {
      mockService.findOne.mockResolvedValue(mockReport);
      const result = await controller.findOne('r1');
      expect(result).toEqual(mockReport);
      expect(service.findOne).toHaveBeenCalledWith('r1');
    });

    it('should throw NotFoundException if not found', async () => {
      mockService.findOne.mockRejectedValue(new NotFoundException());
      await expect(controller.findOne('r2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a soil report', async () => {
      mockService.update.mockResolvedValue({ ...mockReport, n: { Low: 50, High: 0, Medium: 0 } });
      const dto = {
        n: { Low: 50, High: 0, Medium: 0 },
      };
      const result = await controller.update('r1', dto);
      expect(result).toEqual({ ...mockReport, n: { Low: 50, High: 0, Medium: 0 } });
      expect(service.update).toHaveBeenCalledWith('r1', dto);
    });
  });

  describe('remove', () => {
    it('should delete a soil report', async () => {
      mockService.delete.mockResolvedValue(undefined);
      await expect(controller.remove('r1')).resolves.toBeUndefined();
      expect(service.delete).toHaveBeenCalledWith('r1');
    });
  });
});
