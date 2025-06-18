// src/contact/contact.controller.ts
import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ContactService } from '../services/contacts.service';
import { CreateContactDto } from '../dtos/create-contact.dto';


@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get()
  findByCategory(@Query('category') category: string) {
    return this.contactService.findByCategory(category);
  }
}
