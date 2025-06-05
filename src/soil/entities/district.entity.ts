import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class District {
  @PrimaryGeneratedColumn('uuid')
  district_id: string;

  @Column()
  district_name: string;
}
