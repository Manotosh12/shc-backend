import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateStateDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  state_name?: string;
}
