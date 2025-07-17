import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ContactService } from '../services/contact.service';
import { CreateContactDto } from '../dtos/create-contact.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('contacts')
@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact' })
  @ApiBody({ type: CreateContactDto })
  @ApiResponse({ status: 201, description: 'Contact created successfully' })
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get contacts by category' })
  @ApiQuery({
    name: 'category',
    required: true,
    description: 'Category of the contact (DACFW, NIC, STATE)',
    example: 'STATE',
  })
  @ApiResponse({ status: 200, description: 'Contacts returned successfully' })
  findByCategory(@Query('category') category: string) {
    return this.contactService.findByCategory(category);
  }
}
