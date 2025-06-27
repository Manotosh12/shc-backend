import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateVillageDto {
    @ApiProperty({ example: 'Village A', description: 'Name of the village' })
    @IsString()
    @IsNotEmpty()
    @Length(2, 100)
    village_name: string; 
}