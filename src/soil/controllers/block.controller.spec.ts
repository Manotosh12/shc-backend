import { Test, TestingModule } from '@nestjs/testing';
import { BlockController } from './block.controller';
import { BlockService } from '../services/block.service';

describe('BlockController', () => {
  let controller: BlockController;
  let service: BlockService;

  const mockBlockService = {
    createBlock: jest.fn(dto => ({ id: '1', ...dto })),
    findBlocksByDistrict: jest.fn(districtId => [{ id: '1', block_name: 'Block A', district_id: districtId }]),
    findAllBlocks: jest.fn(() => [{ id: '1', block_name: 'Block A', district_id: 'd1' }]),
    findOneBlock: jest.fn(id => ({ id, block_name: 'Block A', district_id: 'd1' })),
    updateBlock: jest.fn((id, dto) => ({ id, ...dto })),
    deleteBlock: jest.fn(id => ({ deleted: true })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockController],
      providers: [
        { provide: BlockService, useValue: mockBlockService },
      ],
    }).compile();

      controller = module.get<BlockController>(BlockController);
      service = module.get<BlockService>(BlockService);
    });
  
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  
    it('should create a block', async () => {
      const dto = { block_name: 'Block A', district_id: 'd1' };
      expect(await controller.create(dto)).toEqual({ id: '1', ...dto });
      expect(service.createBlock).toHaveBeenCalledWith(dto);
    });
  
    it('should get all blocks', async () => {
      expect(await controller.findAll()).toEqual([{ id: '1', block_name: 'Block A', district_id: 'd1' }]);
      expect(service.findAllBlocks).toHaveBeenCalled();
    });
  
    it('should get blocks by district (query param)', async () => {
      expect(await controller.findAll('d1')).toEqual([{ id: '1', block_name: 'Block A', district_id: 'd1' }]);
      expect(service.findBlocksByDistrict).toHaveBeenCalledWith('d1');
    });
  
    it('should get blocks by district (path param)', async () => {
      expect(await controller.getBlocksByDistrict('d1')).toEqual([{ id: '1', block_name: 'Block A', district_id: 'd1' }]);
      expect(service.findBlocksByDistrict).toHaveBeenCalledWith('d1');
    });
  
    it('should get block by id', async () => {
      expect(await controller.findOne('1')).toEqual({ id: '1', block_name: 'Block A', district_id: 'd1' });
      expect(service.findOneBlock).toHaveBeenCalledWith('1');
    });
  
    it('should update block', async () => {
      const dto = { block_name: 'Block B' };
      expect(await controller.update('1', dto)).toEqual({ id: '1', ...dto });
      expect(service.updateBlock).toHaveBeenCalledWith('1', dto);
    });
  
    it('should delete block', async () => {
      expect(await controller.remove('1')).toEqual({ deleted: true });
      expect(service.deleteBlock).toHaveBeenCalledWith('1');
    });
  });