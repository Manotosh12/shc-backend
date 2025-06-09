// src/soil/dto/create-district.dto.ts
import { IsString, IsUUID } from 'class-validator';

export class CreateDistrictDto {
  @IsString()
  district_name: string;

  @IsUUID()
  state_id: string;
}

