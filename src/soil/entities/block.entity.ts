import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('blocks')
export class Block {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  block_name: string;

  @Column({ type: 'varchar', length: 20 })
  block_code: string;

}