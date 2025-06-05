import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SoilReportBlockwise } from './soil-report-blockwise.entity';

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  stateId: number;

  @Column()
  stateName: string;
  
  @OneToMany(() => SoilReportBlockwise, soil => SoilReportBlockwise)
  soilReports: SoilReportBlockwise[];
}
