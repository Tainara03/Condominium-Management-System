import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import User from "./User";

@Entity("packages")
class Package {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("varchar", { length: 255, nullable: false })
    description!: string;

    @Column("timestamp", { nullable: false })
    received_at!: Date;

    @Column("varchar", { length: 50, nullable: false })
    status!: string;

    // armazena a FK user
    @Column({ type: "uuid", nullable: false })
    user_id!: string;

    // relacionamento com user
    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user!: User;
}

export default Package;