import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Crops {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  variety: string;

  @Column()
  irrigation: string;

  @Column()
  season: string;

  @Column()
  state: string;

  @Column()
  district: string;  
}
