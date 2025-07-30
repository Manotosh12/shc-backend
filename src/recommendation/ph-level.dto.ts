import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PHLevelDto {
    [key: string]: number; 
  @ApiProperty() @IsNumber() Acidic: number;
  @ApiProperty() @IsNumber() Neutral: number;
  @ApiProperty() @IsNumber() Alkaline: number;
}
