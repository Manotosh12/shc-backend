import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateBlockDto {

  @ApiProperty({example: 'Block A', description: 'Name of the block'})
  @IsString()
  @IsNotEmpty()
  block_name: string;
}
