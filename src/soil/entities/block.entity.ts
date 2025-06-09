import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('blocks')
export class Block {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  block_name: string;
  district: any;
}