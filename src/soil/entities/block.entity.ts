import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { District } from './district.entity';
import { SoilReportBlockwise } from './soil-report-blockwise.entity';

@Entity('blocks')
export class Block {
  @PrimaryGeneratedColumn('uuid')
  block_id: string;

  @Column({ type: 'varchar', length: 100 })
  block_name: string;

  @ManyToOne(() => District, (district) => district.blocks, { onDelete: 'CASCADE' })
  district: District; 

  @OneToMany(() => SoilReportBlockwise, soilReport => soilReport.block, { cascade: true })
  soilReports: SoilReportBlockwise[];
  
}