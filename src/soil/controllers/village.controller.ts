import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { read } from "fs";
import { VillageService } from "../services/village.service";
import { CreateBlockDto } from "../dtos/create-block.dto";
import { CreateVillageDto } from "../dtos/create-village-dto";

@ApiTags('Villages') // This will group the endpoints under "Villages" 
@Controller('villages')
export class VillagController{
    constructor(private readonly villageService : VillageService){}
    
    @Post()
    @ApiOperation({ summary: 'Create a new village' })
    @ApiBody({type: CreateVillageDto})
    @ApiResponse({ status: 201, description: 'Village created successfully' })
    create(@Body() body: CreateBlockDto){
        
    }
}