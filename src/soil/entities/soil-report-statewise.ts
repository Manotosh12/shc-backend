import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { State } from "./State.entity";

@Entity('soil_report_statewise')
export class SoilReportStatewise {  
    @PrimaryGeneratedColumn('uuid')
    statewise_report_id: string;

    @Column('jsonb')
    n: Record<string, number>;

    @Column('jsonb')
    p: Record<string, number>;

    @Column('jsonb')
    k: Record<string, number>;

    @Column('jsonb')
    OC: Record<string, number>;

    @Column('jsonb')
    pH: Record<string, number>;

    @Column({ type: 'timestamp' })
    timestamp: Date;

    @ManyToOne(() => State, state => state.soilReports, {onDelete : 'CASCADE'})
    state: State;
    
}