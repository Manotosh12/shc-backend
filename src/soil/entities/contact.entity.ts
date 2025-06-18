
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  designation: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  category: string; // Example: DACFW, NIC, STATE
}
