import { Test, TestingModule } from '@nestjs/testing';
import { SoilReportStatewiseController } from './soil-report-statewise.controller';
import { SoilReportStatewiseService } from '../services/soil-report-statewise.service';
import { BadRequestException } from '@nestjs/common';

describe('SoilReportStatewiseController', () => {
  let controller: SoilReportStatewiseController;
  let service: SoilReportStatewiseService;

  const mockService = {
    createReport: jest.fn((stateId, dto) => ({ stateId, ...dto })),
    findByState: jest.fn(stateId => [{ stateId }]),
    findAll: jest.fn(() => [{ id: '1' }]),
    findOne: jest.fn(id => ({ id })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    delete: jest.fn(id => ({ deleted: true, id })),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoilReportStatewiseController],
      providers: [
        { provide: SoilReportStatewiseService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<SoilReportStatewiseController>(SoilReportStatewiseController);
    service = module.get<SoilReportStatewiseService>(SoilReportStatewiseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a soil report', async () => {
    const dto = { n: {}, p: {}, k: {}, OC: {}, pH: {}, timestamp: '2023-01-01T00:00:00Z' };
    expect(await controller.create('state1', dto)).toEqual({ stateId: 'state1', ...dto });
    expect(service.createReport).toHaveBeenCalledWith('state1', dto);
  });

  it('should get all soil reports', async () => {
    expect(await controller.findAll()).toEqual([{ id: '1' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should get soil reports by stateId (query param)', async () => {
    expect(await controller.findAll('state1')).toEqual([{ stateId: 'state1' }]);
    expect(service.findByState).toHaveBeenCalledWith('state1');
  });

  it('should get soil reports by stateId (path param)', async () => {
    expect(await controller.findByState('state1')).toEqual([{ stateId: 'state1' }]);
    expect(service.findByState).toHaveBeenCalledWith('state1');
  });

  it('should get a soil report by id', async () => {
    expect(await controller.findOne('1')).toEqual({ id: '1' });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a soil report', async () => {
    const dto = { n: { Low: 1 } };
    expect(await controller.update('1', dto)).toEqual({ id: '1', ...dto });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('should throw BadRequestException if update dto is empty', async () => {
  jest.clearAllMocks();
    const emptyDto = {};
  const updateSpy = jest.spyOn(service, 'update');

    await expect(controller.update('1', emptyDto as any)).rejects.toThrow(BadRequestException);

    expect(updateSpy).not.toHaveBeenCalled();
  });


  it('should delete a soil report', async () => {
        expect(await controller.remove('1')).toEqual({ deleted: true, id: '1' });
        expect(service.delete).toHaveBeenCalledWith('1');
      });
    });