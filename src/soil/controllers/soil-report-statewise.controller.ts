import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { SoilReportStatewiseService } from "../services/soil-report-statewise.service";
import { CreateSoilReportStatewiseDto } from "../dtos/create-soil-report-statewise.dto";
import { UpdateSoilReportStatewiseDto } from "../dtos/update-soil-report-statewise.dto";

@Controller('soil-report-statewise')
export class SoilReportStatewiseController {
    constructor( private readonly service: SoilReportStatewiseService){}

    @Post(':stateId')
    create(
        @Param('stateId') stateId : string,
        @Body() dto : CreateSoilReportStatewiseDto
    ){
        return this.service.createReport(stateId,dto);
    }

    @Get()
    findAll(@Query('stateId') stateId?: string) {
        if (stateId) {
        return this.service.findByState(stateId);
        }
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }
    
    @Patch(':id')
    update(
    @Param('id') id: string,
    @Body() dto: UpdateSoilReportStatewiseDto,) {
        if (!Object.keys(dto).length) {
        throw new BadRequestException('No update fields provided.');
        }
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
    return this.service.delete(id);
    }
    
}