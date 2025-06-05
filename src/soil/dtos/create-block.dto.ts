import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateBlockDto {
  @IsString()
  @IsNotEmpty()
  block_name: string;

  @IsString()
  @Length(1, 20)
  block_code: string;
}
