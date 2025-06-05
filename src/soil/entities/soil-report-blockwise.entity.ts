import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('soil_report_blockwise')
export class SoilReportBlockwise {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  state_name: string;

  @Column()
  district_name: string;

  @Column()
  block_name: string;

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
}

