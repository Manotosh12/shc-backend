// src/soil/dto/create-district.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateDistrictDto {
  @ApiProperty({example: 'District A', description: 'Name of the District'})
  @IsString()
  district_name: string;

  @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', description: 'UUID of the related State' })
  @IsUUID()
  state_id: string;
}

