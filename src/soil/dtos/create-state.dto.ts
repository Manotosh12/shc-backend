import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateStateDto {
  @ApiProperty({ example: 'State A', description: 'Name of the State' })
  @IsString()
  @MinLength(2)
  state_name: string;
}
