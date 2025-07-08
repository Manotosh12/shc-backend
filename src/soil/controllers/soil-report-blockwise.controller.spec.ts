import { Test, TestingModule } from '@nestjs/testing';
import { SoilReportBlockwiseController } from './soil-report-blockwise.controller';
import { SoilReportBlockwiseService } from '../services/soil-report-blockwise.service';
import { BadRequestException } from '@nestjs/common';

describe('SoilReportBlockwiseController', () => {
  let controller: SoilReportBlockwiseController;
  let service: SoilReportBlockwiseService;

  const mockService = {
    createReport: jest.fn((blockId, dto) => ({ blockId, ...dto })),
    findByDistrict: jest.fn(districtId => [{ id: '1', districtId }]),
    findByBlock: jest.fn(blockId => [{ id: '1', blockId }]),
    findAll: jest.fn(() => [{ id: '1' }]),
    findOne: jest.fn(id => ({ id })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    delete: jest.fn(id => ({ deleted: true, id })),
    getDistrictWiseBlockData: jest.fn(districtId => [{ districtId }]),
    getBlockWiseReport: jest.fn(blockId => [{ blockId }]),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoilReportBlockwiseController],
      providers: [
        { provide: SoilReportBlockwiseService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<SoilReportBlockwiseController>(SoilReportBlockwiseController);
    service = module.get<SoilReportBlockwiseService>(SoilReportBlockwiseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a soil report', async () => {
    const dto = { n: {}, p: {}, k: {}, OC: {}, pH: {}, timestamp: '2023-01-01T00:00:00Z' };
    expect(await controller.create('block1', dto)).toEqual({ blockId: 'block1', ...dto });
    expect(service.createReport).toHaveBeenCalledWith('block1', dto);
  });

  it('should get all soil reports', async () => {
    expect(await controller.findAll()).toEqual([{ id: '1' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should get soil reports by district', async () => {
    expect(await controller.findAll('district1')).toEqual([{ id: '1', districtId: 'district1' }]);
    expect(service.findByDistrict).toHaveBeenCalledWith('district1');
  });

  it('should get soil reports by block', async () => {
    expect(await controller.findAll(undefined, 'block1')).toEqual([{ id: '1', blockId: 'block1' }]);
    expect(service.findByBlock).toHaveBeenCalledWith('block1');
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
    const updateSpy = jest.spyOn(service, 'update');
    await expect(controller.update('1', {} as any)).rejects.toThrow(BadRequestException);
    expect(updateSpy).not.toHaveBeenCalled();
  });


  it('should delete a soil report', async () => {
    expect(await controller.remove('1')).toEqual({ deleted: true, id: '1' });
    expect(service.delete).toHaveBeenCalledWith('1');
  });

  it('should get district-wise block report', async () => {
    expect(await controller.getStateWiseDistrictData('district1')).toEqual([{ districtId: 'district1' }]);
    expect(service.getDistrictWiseBlockData).toHaveBeenCalledWith('district1');
  });

  it('should get block-wise soil report', async () => {
        expect(await controller.getBlockWiseReport('block1')).toEqual([{ blockId: 'block1' }]);
        expect(service.getBlockWiseReport).toHaveBeenCalledWith('block1');
      });
    });