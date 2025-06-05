
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { District } from '../district/district.entity';

@Entity()
export class Block {
  @PrimaryGeneratedColumn()
  blockId: number;

  @Column()
  blockName: string;

  @ManyToOne(() => District, district => district.blocks)
  district: District;
}
