import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Unit from "./Unit";

@Entity("packages")
class Package {

    @PrimaryGeneratedColumn("uuid", { name: "id_package" })
    id!: string;

    @Column("varchar", { length: 255, nullable: false })
    description!: string;

    @Column("timestamp", { nullable: false })
    received_at!: Date;

    @Column("varchar", { length: 50, nullable: false })
    status!: string;

    @Column({ type: "uuid", nullable: false })
    unit_id!: string;
    
    @ManyToOne(() => Unit)
    @JoinColumn({ name: 'unit_id' })
    unit?: Unit
}

export default Package;