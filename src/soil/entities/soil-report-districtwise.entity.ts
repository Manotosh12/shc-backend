import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { District } from './district.entity';

@Entity('soil_report_districtwise')
export class SoilReportDistrictwise {
  @PrimaryGeneratedColumn('uuid')
  districtwise_report_id: string;

  @Column('jsonb')
  n: Record<string, number>;

  @Column('jsonb')
  p: Record<string, number>;

  @Column('jsonb')
  k: Record<string, number>;

  @Column('jsonb')
  OC: Record<string, number>;

  @Column('jsonb')
  pH: Record<string, number>;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @ManyToOne(() => District, district => district.soilReports, { onDelete: 'CASCADE' })
  district: District;
}
