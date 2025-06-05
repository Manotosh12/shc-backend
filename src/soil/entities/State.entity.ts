import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SoilReportBlockwise } from './soil-report-blockwise.entity';

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  state_id: number;

  @Column()
  state_name: string;
  
  @OneToMany(() => SoilReportBlockwise, soil => SoilReportBlockwise)
  soilReports: SoilReportBlockwise[];
}
