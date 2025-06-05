import { IsString, IsObject, IsDateString } from 'class-validator';

export class CreateSoilReportBlockwiseDto {
  @IsString()
  state_name: string;

  @IsString()
  district_name: string;

  

  @IsObject()
  n: Record<string, number>;

  @IsObject()
  p: Record<string, number>;

  @IsObject()
  k: Record<string, number>;

  @IsObject()
  OC: Record<string, number>;

  @IsObject()
  pH: Record<string, number>;

  @IsDateString()
  timestamp: string;
}
