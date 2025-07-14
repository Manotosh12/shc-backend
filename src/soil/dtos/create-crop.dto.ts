import { IsString, IsOptional } from 'class-validator';

export class CreateCropDto {
  @IsString()
  name: string;

  @IsString()
  variety: string;

  @IsString()
  irrigation: string;

  @IsString()
  season: string;

  @IsString()
  state: string;

  @IsString()
  district: string;
}
