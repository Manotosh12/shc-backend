import { PartialType } from "@nestjs/mapped-types";
import { CreateSoilReportStatewiseDto } from "./create-soil-report-statewise.dto";

export class UpdateSoilReportStatewiseDto extends PartialType(CreateSoilReportStatewiseDto) {}