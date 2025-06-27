import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('villages')
export class Village {
    @PrimaryGeneratedColumn('uuid')
    village_id: string;

    @Column({type:'varchar', length: 100})
    village_name: string;

    
}