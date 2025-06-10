import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { State } from './State.entity';
import { Block } from './block.entity';
import { SoilReportBlockwise } from './soil-report-blockwise.entity';
import { SoilReportDistrictwise } from './soil-report-districtwise.entity';

@Entity()
export class District {
  @PrimaryGeneratedColumn('uuid')
  district_id: string;

  @Column()
  district_name: string;

  @ManyToOne(() => State, state => state.districts, { onDelete: 'CASCADE' })
  state: State;

  @OneToMany(() => Block, (block) => block.district, { cascade: true })
  blocks: Block[];

  @OneToMany(() => SoilReportDistrictwise, soilReport => soilReport.district, { cascade: true })
  soilReports: SoilReportDistrictwise[];
}
