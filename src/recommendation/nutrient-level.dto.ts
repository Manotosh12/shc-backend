import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class NutrientLevelDto {
    [key: string]: number; 
  @ApiProperty() @IsNumber() Low: number;
  @ApiProperty() @IsNumber() Medium: number;
  @ApiProperty() @IsNumber() High: number;
}

