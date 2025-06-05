
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { State } from '../state.entity'; 
import { Block } from '../block/block.entity';

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  districtId: number;

  @Column()
  districtName: string;

  @Column({ unique: true })
  districtCode: number;

  @ManyToOne(() => State, state => state.districts)
  state: State;

  @OneToMany(() => Block, block => block.district)
  blocks: Block[];
}
