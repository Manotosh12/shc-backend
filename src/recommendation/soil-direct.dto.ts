import { IsNumber } from 'class-validator';

export class SoilDirectDto {
  @IsNumber()
  n: number;   // available Nitrogen (kg/acre)

  @IsNumber()
  p: number;   // available Phosphorus (kg/acre)

  @IsNumber()
  k: number;   // available Potassium (kg/acre)

  @IsNumber()
  OC: number;  // Organic Carbon %

  @IsNumber()
  pH: number;  // Soil pH
}
