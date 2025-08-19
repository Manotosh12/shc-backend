import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateBlockDto {

  @ApiProperty({example: 'Block A', description: 'Name of the block'})
  @IsString()
  @IsNotEmpty()
  block_name: string;

  @ApiProperty({ example: 'c3f3f680-1234-4a5b-9e6c-0a1d2e3f4b5c', description: 'UUID of the district' })
  @IsUUID()
  @IsNotEmpty()
  district_id: string;
}
