import { IsString, MinLength } from 'class-validator';

export class CreateStateDto {
  @IsString()
  @MinLength(2)
  state_name: string;
}
