import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contacts.service';
import { Contact } from '../entities/contact.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from '../dtos/create-contact.dto';

describe('ContactService', () => {
  let service: ContactService;
  let repo: Repository<Contact>;

  const mockContact: Contact = {
    id: 'uuid-123',
    name: 'John Doe',
    designation: 'Officer',
    phone: '1234567890',
    email: 'john@example.com',
    category: 'STATE',
  };

  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: getRepositoryToken(Contact),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ContactService>(ContactService);
    repo = module.get<Repository<Contact>>(getRepositoryToken(Contact));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create and save a new contact', async () => {
      const dto: CreateContactDto = {
        name: 'John Doe',
        designation: 'Officer',
        phone: '1234567890',
        email: 'john@example.com',
        category: 'STATE',
      };

      mockRepo.create.mockReturnValue(dto);
      mockRepo.save.mockResolvedValue(mockContact);

      const result = await service.create(dto);

      expect(mockRepo.create).toHaveBeenCalledWith(dto);
      expect(mockRepo.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockContact);
    });
  });

  describe('findByCategory()', () => {
    it('should return all contacts with the given category', async () => {
      const contacts = [mockContact];

      mockRepo.find.mockResolvedValue(contacts);

      const result = await service.findByCategory('STATE');

      expect(mockRepo.find).toHaveBeenCalledWith({ where: { category: 'STATE' } });
      expect(result).toEqual(contacts);
    });
  });
});
