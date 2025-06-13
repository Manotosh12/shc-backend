import { IsDate, IsDateString, IsObject } from "class-validator";

export class CreateSoilReportStatewiseDto {
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
    timestamp: Date;
}