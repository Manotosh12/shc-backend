// src/soil/dto/update-soil-report-blockwise.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateSoilReportBlockwiseDto } from './create-soil-report-blockwise.dto';


export class UpdateSoilReportBlockwiseDto extends PartialType(CreateSoilReportBlockwiseDto) {}
