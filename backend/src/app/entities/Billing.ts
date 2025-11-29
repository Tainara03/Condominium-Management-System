import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,  } from "typeorm"
import Unit from "./Unit"

@Entity('billing')
class Billing{
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('decimal', {nullable: false})
    ammount!: number;

    @Column('timestamp', {nullable: false})
    due_date!: Date;

    @Column('boolean', {nullable: false, default: false })
    is_paid!: boolean;

    @Column('timestamp', {nullable: true, default: null})
    paid_at!: Date;

    @Column('text', {nullable: true, default: null})
    description!: Date;

    // armazena a FK unit_id
    @Column({ type: "uuid", nullable: false })
    unit_id!: string;
    
    // relacionamento com unit
    @ManyToOne(()=> Unit)
    @JoinColumn( {name: 'unit_id'} )
    unit?: Unit

}

export default Billing