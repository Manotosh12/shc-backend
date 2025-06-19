import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ example: 'John Doe', description: 'Name of the contact person' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Director', description: 'Designation of the contact person' })
  @IsString()
  designation: string;

  @ApiProperty({ example: '+91-9876543210', description: 'Phone number of the contact person' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email address of the contact person' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'STATE', description: 'Category of the contact (DACFW, NIC, STATE)' })
  @IsString()
  category: string; // DACFW, NIC, STATE
}
