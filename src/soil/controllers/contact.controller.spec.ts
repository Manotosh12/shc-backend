import { Test, TestingModule } from '@nestjs/testing';

import { ContactService } from '../services/contact.service';
import { CreateContactDto } from '../dtos/create-contact.dto';
import { ContactController } from './contact.controller';

describe('ContactController', () => {
  let controller: ContactController;
  let service: ContactService;

  const mockContactService = {
    create: jest.fn(),
    findByCategory: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        {
          provide: ContactService,
          useValue: mockContactService,
        },
      ],
    }).compile();

    controller = module.get<ContactController>(ContactController);
    service = module.get<ContactService>(ContactService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /contacts', () => {
    it('should create a new contact', async () => {
      const dto: CreateContactDto = {
        name: 'John Doe',
        designation: 'Officer',
        phone: '1234567890',
        email: 'john@example.com',
        category: 'STATE',
      };

      const result = { id: 'uuid-123', ...dto };

      mockContactService.create.mockResolvedValue(result);

      const response = await controller.create(dto);

      expect(response).toEqual(result);
      expect(mockContactService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('GET /contacts?category=STATE', () => {
    it('should return contacts by category', async () => {
      const category = 'STATE';
      const result = [
        {
          id: 'uuid-123',
          name: 'John Doe',
          designation: 'Officer',
          phone: '1234567890',
          email: 'john@example.com',
          category: 'STATE',
        },
      ];

      mockContactService.findByCategory.mockResolvedValue(result);

      const response = await controller.findByCategory(category);

      expect(response).toEqual(result);
      expect(mockContactService.findByCategory).toHaveBeenCalledWith(category);
    });
  });
});
