import { IsOptional, IsString } from 'class-validator';

export class UpdateDistrictDto {
  @IsString()
  @IsOptional()
  district_name?: string;
}
