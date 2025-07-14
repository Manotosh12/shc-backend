import { Test, TestingModule } from '@nestjs/testing';

import { StateService } from '../services/state.service';
import { CreateStateDto } from '../dtos/create-state.dto';
import { UpdateStateDto } from '../dtos/update-state.dto';
import { StateController } from './State.controller';

describe('StateController', () => {
  let controller: StateController;
  let service: StateService;

  const mockState = { state_id: '1', state_name: 'TestState', districts: [], soilReports: [] };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateController],
      providers: [
        {
          provide: StateService,
          useValue: {
            createState: jest.fn(),
            findAllStates: jest.fn(),
            findOneState: jest.fn(),
            updateState: jest.fn(),
            deleteState: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StateController>(StateController);
    service = module.get<StateService>(StateService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Test create
  describe('create', () => {
    it('should create and return the state', async () => {
      const dto: CreateStateDto = { state_name: 'TestState' };
      (service.createState as jest.Mock).mockResolvedValue(mockState);

      const result = await controller.create(dto);

      expect(service.createState).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockState);
    });
  });

  // ✅ Test findAll
  describe('findAll', () => {
    it('should return all states', async () => {
      (service.findAllStates as jest.Mock).mockResolvedValue([mockState]);

      const result = await controller.findAll();

      expect(service.findAllStates).toHaveBeenCalled();
      expect(result).toEqual([mockState]);
    });
  });

  // ✅ Test findOne
  describe('findOne', () => {
    it('should return state by ID', async () => {
      (service.findOneState as jest.Mock).mockResolvedValue(mockState);

      const result = await controller.findOne('1');

      expect(service.findOneState).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockState);
    });
  });

  // ✅ Test update
  describe('update', () => {
    it('should update and return the state', async () => {
      const dto: UpdateStateDto = { state_name: 'UpdatedState' };
      const updatedState = { ...mockState, state_name: 'UpdatedState' };
      (service.updateState as jest.Mock).mockResolvedValue(updatedState);

      const result = await controller.update('1', dto);

      expect(service.updateState).toHaveBeenCalledWith('1', dto);
      expect(result).toEqual(updatedState);
    });
  });

  // ✅ Test remove
  describe('remove', () => {
    it('should delete the state', async () => {
      (service.deleteState as jest.Mock).mockResolvedValue(undefined);

      const result = await controller.remove('1');

      expect(service.deleteState).toHaveBeenCalledWith('1');
      expect(result).toBeUndefined();
    });
  });
});
