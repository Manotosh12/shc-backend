import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Block } from './block.entity';

@Entity('soil_report_blockwise')
export class SoilReportBlockwise {
  @PrimaryGeneratedColumn('uuid')
  blockwise_report_id: string;

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

  @ManyToOne(() => Block, block => block.soilReports, { onDelete: 'CASCADE' })
  block: Block;
}

