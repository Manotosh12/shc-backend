import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('soil_reports_blockwise')
export class SoilReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

