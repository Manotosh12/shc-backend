import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from './state.service';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { District } from '../entities/district.entity';
import { State } from '../entities/State.entity';

describe('StateService', () => {
  let service: StateService;
  let stateRepo: jest.Mocked<Repository<State>>;
  let districtRepo: jest.Mocked<Repository<District>>;

  // ✅ Mock districts matching real District entity shape
  const mockDistricts: District[] = [
    {
      district_id: 'd1',
      district_name: 'District1',
      state: {} as State,
      blocks: [],
      soilReports: [],
    },
    {
      district_id: 'd2',
      district_name: 'District2',
      state: {} as State,
      blocks: [],
      soilReports: [],
    },
  ];

  // ✅ Mock state matching State entity shape
  const mockState: State = {
    state_id: '1',
    state_name: 'TestState',
    districts: mockDistricts,
    soilReports: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(State),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(District),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StateService>(StateService);
    stateRepo = module.get(getRepositoryToken(State));
    districtRepo = module.get(getRepositoryToken(District));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Test createState
  describe('createState', () => {
    it('should create and save a new state with districts', async () => {
      const data = { state_name: 'TestState', districts: mockDistricts };
      const createdState = { ...mockState } as State;

      stateRepo.create.mockReturnValue(createdState);
      stateRepo.save.mockResolvedValue(createdState);

      const result = await service.createState(data);

      expect(stateRepo.create).toHaveBeenCalledWith({
        state_name: 'TestState',
        districts: mockDistricts,
      });
      expect(stateRepo.save).toHaveBeenCalledWith(createdState);
      expect(result).toEqual(createdState);
    });
  });

  // ✅ Test findAllStates
  describe('findAllStates', () => {
    it('should return all states with districts', async () => {
      stateRepo.find.mockResolvedValue([mockState]);

      const result = await service.findAllStates();

      expect(stateRepo.find).toHaveBeenCalledWith({ relations: ['districts'] });
      expect(result).toEqual([mockState]);
    });
  });

  // ✅ Test findOneState
  describe('findOneState', () => {
    it('should return the state when found', async () => {
      stateRepo.findOne.mockResolvedValue(mockState);

      const result = await service.findOneState('1');

      expect(stateRepo.findOne).toHaveBeenCalledWith({
        where: { state_id: '1' },
        relations: ['districts'],
      });
      expect(result).toEqual(mockState);
    });

    it('should throw NotFoundException when state not found', async () => {
      stateRepo.findOne.mockResolvedValue(null);

      await expect(service.findOneState('2')).rejects.toThrow(NotFoundException);
    });
  });

  // ✅ Test updateState
  describe('updateState', () => {
    it('should update state name and districts', async () => {
      const updatedData = { state_name: 'UpdatedName', districts: mockDistricts };
      const foundState = { ...mockState } as State;

      jest.spyOn(service, 'findOneState').mockResolvedValue(foundState);
      districtRepo.create.mockImplementation(d => d as District);
      stateRepo.save.mockResolvedValue({ ...foundState, ...updatedData });

      const result = await service.updateState('1', updatedData);

      expect(foundState.state_name).toBe('UpdatedName');
      expect(foundState.districts).toEqual(
        mockDistricts.map(d => expect.objectContaining({ district_name: d.district_name }))
      );
      expect(stateRepo.save).toHaveBeenCalledWith(foundState);
      expect(result).toEqual({ ...foundState, ...updatedData });
    });
  });

  // ✅ Test deleteState
  describe('deleteState', () => {
    it('should remove the state', async () => {
      const foundState = { ...mockState } as State;
      jest.spyOn(service, 'findOneState').mockResolvedValue(foundState);

      await service.deleteState('1');

      expect(stateRepo.remove).toHaveBeenCalledWith(foundState);
    });
  });
});
