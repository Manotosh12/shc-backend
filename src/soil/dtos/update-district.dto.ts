// src/soil/dto/update-district.dto.ts
import { IsOptional, IsString, IsUUID, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class BlockDto {
  @ApiProperty({ example: 'Block A', description: 'Name of the Block' })
  @IsString()
  block_name: string;
}

export class UpdateDistrictDto {
  @ApiPropertyOptional({ example: 'Updated District A', description: 'Updated name of the District' })
  @IsOptional()
  @IsString()
  district_name?: string;

  @ApiPropertyOptional({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', description: 'UUID of the related State' })
  @IsOptional()
  @IsUUID()
  state_id?: string;

  @ApiPropertyOptional({
    type: [BlockDto],
    description: 'List of blocks to update in the district',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlockDto)
  blocks?: BlockDto[];
}

