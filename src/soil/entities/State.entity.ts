import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { District } from './district.entity';
import { SoilReportStatewise } from './soil-report-statewise';

@Entity()
export class State {
  @PrimaryGeneratedColumn('uuid')
  state_id: string;

  @Column()
  state_name: string;
  
  @OneToMany(() => District, district => district.state, { cascade: true })
  districts: District[];
  
  @OneToMany(() => SoilReportStatewise, soilReport => soilReport.state, {cascade: true} )
  soilReports : SoilReportStatewise[];
}
