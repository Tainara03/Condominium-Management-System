import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,  } from "typeorm"
import User from "./User";

@Entity('history')
class History{
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('varchar', {nullable: true, default: null})
    event_title!: string;

    @Column('varchar', {nullable: true, default: null})
    table_name!: string;

    @Column({ type: "uuid", nullable: false })
    event_id!: string;

    @Column({ type: "uuid", nullable: false })
    target_entity!: string | null; 

    @Column('timestamp', {nullable: true, default: null})
    created_at!: Date;

    // armazena a FK do usuáio
    @Column({ type: "uuid", nullable: true })
    performed_by!: string | null;
    
    // relacionamento com user
    @ManyToOne(()=> User)
    @JoinColumn( {name: 'performed_by'} )
    performed_by_user!: User | null
}

export default History