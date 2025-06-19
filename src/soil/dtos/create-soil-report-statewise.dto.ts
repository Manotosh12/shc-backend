import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsObject } from "class-validator";

export class CreateSoilReportStatewiseDto {
    @ApiProperty({example: '"n": "Low": 46,"High": 0,"Medium": 0', description: 'Nitrogen levels in the soil'})
    @IsObject()
    n: Record<string, number>;

    @ApiProperty({example: '"p": "Low": 46,"High": 0,"Medium": 0', description: 'Phosphorus levels in the soil'})
    @IsObject()
    p: Record<string, number>;

    @ApiProperty({example: '"k": "Low": 46,"High": 0,"Medium": 0', description: 'Potassium levels in the soil'})
    @IsObject()
    k: Record<string, number>;

    @ApiProperty({example: '"OC": "Low": 46,"High": 0,"Medium": 0', description: 'Organic Carbon levels in the soil'})
    @IsObject()
    OC: Record<string, number>;

    @ApiProperty({example: '"pH": "Low": 46,"High": 0,"Medium": 0', description: 'pH levels in the soil'})
    @IsObject()
    pH: Record<string, number>;

    @ApiProperty({example: '2023-10-01T12:00:00Z', description: 'Timestamp of the soil report'})
    @IsDateString()
    timestamp: string;
}