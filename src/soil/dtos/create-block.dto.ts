import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateBlockDto {
  @IsString()
  @IsNotEmpty()
  block_name: string;
}
