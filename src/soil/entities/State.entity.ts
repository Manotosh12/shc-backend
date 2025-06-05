import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  stateId: number;

  @Column()
  stateName: string;
}
