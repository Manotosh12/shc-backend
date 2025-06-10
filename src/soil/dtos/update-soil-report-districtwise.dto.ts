import { PartialType } from '@nestjs/mapped-types';
import { CreateSoilReportDistrictwiseDto } from './create-soil-report-districtwise.dto';

export class UpdateSoilReportDistrictwiseDto extends PartialType(CreateSoilReportDistrictwiseDto) {} 