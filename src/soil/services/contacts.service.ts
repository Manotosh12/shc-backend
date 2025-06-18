
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../entities/contact.entity';
import { CreateContactDto } from '../dtos/create-contact.dto';


@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly repo: Repository<Contact>,
  ) {}

  async create(dto: CreateContactDto): Promise<Contact> {
    const contact = this.repo.create(dto);
    return this.repo.save(contact);
  }

  async findByCategory(category: string): Promise<Contact[]> {
    return this.repo.find({ where: { category } });
  }
}
