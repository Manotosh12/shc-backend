import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { NutrientLevelDto } from './nutrient-level.dto';
import { PHLevelDto } from './ph-level.dto';

export class SoilDataDto {
  @ApiProperty({ type: NutrientLevelDto })
  @ValidateNested()
  @Type(() => NutrientLevelDto)
  n: NutrientLevelDto;

  @ApiProperty({ type: NutrientLevelDto })
  @ValidateNested()
  @Type(() => NutrientLevelDto)
  p: NutrientLevelDto;

  @ApiProperty({ type: NutrientLevelDto })
  @ValidateNested()
  @Type(() => NutrientLevelDto)
  k: NutrientLevelDto;

  @ApiProperty({ type: NutrientLevelDto })
  @ValidateNested()
  @Type(() => NutrientLevelDto)
  OC: NutrientLevelDto;

  @ApiProperty({ type: PHLevelDto })
  @ValidateNested()
  @Type(() => PHLevelDto)
  pH: PHLevelDto;
}


