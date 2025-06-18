
import { IsString, IsEmail } from 'class-validator';

export class CreateContactDto {
  @IsString()
  name: string;

  @IsString()
  designation: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  category: string; // DACFW, NIC, STATE
}
