import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateStateDto {
  @ApiPropertyOptional({ example: 'State B', description: 'Updated name of the State (min 2 characters)' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  state_name?: string;
}
