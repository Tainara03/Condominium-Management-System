import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm"
import Unit from "./Unit"

@Entity('billings')
class Billing {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('decimal', { nullable: false, precision: 10, scale: 2 })
    ammount!: number;

    @Column('timestamp', { nullable: false })
    due_date!: Date;

    @Column('boolean', { nullable: false, default: false })
    is_paid!: boolean;

    @Column('text', { nullable: true, default: null })
    description!: string; 

    @Column('varchar', { nullable: true })
    file_path!: string;

    @Column({ type: "uuid", nullable: false })
    unit_id!: string;
    
    @ManyToOne(() => Unit)
    @JoinColumn({ name: 'unit_id' })
    unit?: Unit

}

export default Billing;