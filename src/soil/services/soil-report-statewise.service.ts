import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SoilReportStatewise } from "../entities/soil-report-statewise";
import { Repository } from "typeorm";
import { State } from "../entities/State.entity";
import { CreateSoilReportStatewiseDto } from "../dtos/create-soil-report-statewise.dto";

@Injectable()
export class SoilReportStatewiseService {
    constructor(
        @InjectRepository(SoilReportStatewise)
        private reportRepository : Repository<SoilReportStatewise>,

        @InjectRepository(State)
        private statetRepository : Repository<State>,
    ){}

    async createReport(stateId: string, dto: CreateSoilReportStatewiseDto) {
    // Find the state entity
        const state = await this.statetRepository.findOne({ where: { state_id: stateId } });
        if (!state) {
            throw new NotFoundException(`State with ID ${stateId} not found.`);
        }

        // Create the report entity
        const report = this.reportRepository.create({
            ...dto,
            timestamp: new Date(dto.timestamp),
            state,
        });
        return this.reportRepository.save(report);
    }

    async findByState(stateId: string) {
        return this.reportRepository.find({
            where: { state: { state_id: stateId } },
            relations: ['state'],
            order: { timestamp: 'DESC' }
        });
    }

    async findAll() {
        return this.reportRepository.find({
            relations: ['state'],
            order: { timestamp: 'DESC' }
        });
    }

    async findOne(id: string) {
        return this.reportRepository.findOne({ where: { statewise_report_id: id }, relations: ['state'] });
    }

    async update(id: string, dto: Partial<CreateSoilReportStatewiseDto>) {
        const report = await this.findOne(id);
        if (!report) {
        throw new NotFoundException(`Soil report with ID ${id} not found.`);
        }
        Object.assign(report, dto);
        return this.reportRepository.save(report);
    }

    async delete(id: string) {
        await this.reportRepository.delete(id);
            return { message: 'Deleted successfully' };
    }

}