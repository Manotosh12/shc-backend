// src/soil/dto/update-district.dto.ts
import { IsOptional, IsString, IsUUID, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class BlockDto {
  @IsString()
  block_name: string;
}

export class UpdateDistrictDto {
  @IsOptional()
  @IsString()
  district_name?: string;

  @IsOptional()
  @IsUUID()
  state_id?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlockDto)
  blocks?: BlockDto[];
}

