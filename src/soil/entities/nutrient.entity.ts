import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Nutrient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stateId: string;

  @Column()
  districtId: string;

  @Column()
  blockId: string;

  @Column()
  villageId: string;

  @Column('jsonb')
  data: any;
}
