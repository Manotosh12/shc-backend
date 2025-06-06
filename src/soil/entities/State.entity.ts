import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SoilReportBlockwise } from './soil-report-blockwise.entity';
import { District } from './district.entity';

@Entity()
export class State {
  @PrimaryGeneratedColumn('uuid')
  state_id: string;

  @Column()
  state_name: string;
  
  @OneToMany(() => District, district => district.state)
  districts: District[];

  @OneToMany(() => SoilReportBlockwise, soil => soil.state)
  soilReports: SoilReportBlockwise[];
}
