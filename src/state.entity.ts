import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { District } from '../district/district.entity';

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  stateId: number;

  @Column()
  stateName: string;

  @Column({ unique: true, type: 'int' }) 
  stateCode: number;

  @OneToMany(() => District, district => district.state)
  districts: District[];
}
