import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoilReportDistrictwise } from '../entities/soil-report-districtwise.entity';
import { District } from '../entities/district.entity';
import { CreateSoilReportDistrictwiseDto } from '../dtos/create-soil-report-districtwise.dto';

@Injectable()
export class SoilReportDistrictwiseService {
  constructor(
    @InjectRepository(SoilReportDistrictwise)
    private reportRepository: Repository<SoilReportDistrictwise>,

    @InjectRepository(District)
    private districtRepository: Repository<District>,
  ) {}

  async createReport(districtId: string, data: CreateSoilReportDistrictwiseDto) {
    const district = await this.districtRepository.findOne({ 
      where: { district_id: districtId },
      relations: ['state'] 
    });
    if (!district) throw new NotFoundException('District not found');

    const report = this.reportRepository.create({
      ...data,
      timestamp: new Date(data.timestamp),
      district,
    });

    return this.reportRepository.save(report);
  }

  async findAll() {
    return this.reportRepository.find({ 
      relations: ['district', 'district.state'] 
    });
  }

  async findByDistrict(districtId: string) {
    return this.reportRepository.find({
      where: { district: { district_id: districtId } },
      relations: ['district', 'district.state']
    });
  }

  async findByState(stateId: string) {
    return this.reportRepository.find({
      where: { district: { state: { state_id: stateId } } },
      relations: ['district', 'district.state']
    });
  }

  async findOne(id: string) {
    return this.reportRepository.findOne({ 
      where: { districtwise_report_id: id },
      relations: ['district', 'district.state']
    });
  }

  async update(id: string, data: Partial<CreateSoilReportDistrictwiseDto>) {
    const existing = await this.findOne(id);
    if (!existing) {
      throw new NotFoundException(`Soil report with ID ${id} not found.`);
    }

    const updated = Object.assign(existing, data);
    return this.reportRepository.save(updated);
  }

  async delete(id: string) {
    await this.reportRepository.delete(id);
    return { message: 'Deleted successfully' };
  }

  async getStateWiseDistrictData(stateId: string) {
    // First get all districts in the state
    const districts = await this.districtRepository.find({
      where: { state: { state_id: stateId } },
      relations: ['state', 'soilReports'],
      order: { district_name: 'ASC' }
    });

    if (!districts.length) {
      throw new NotFoundException(`No districts found for state ID ${stateId}`);
    }

    // Format the response to include district-wise soil data
    return districts.map(district => ({
      district_id: district.district_id,
      district_name: district.district_name,
      state: {
        state_id: district.state.state_id,
        state_name: district.state.state_name
      },
      soil_reports: district.soilReports.map(report => ({
        report_id: report.districtwise_report_id,
        n: report.n,
        p: report.p,
        k: report.k,
        OC: report.OC,
        pH: report.pH,
        timestamp: report.timestamp
      }))
    }));
  }
}
