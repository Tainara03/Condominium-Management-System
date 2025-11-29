import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import User from "./User";

@Entity("notices")
class Notice {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("varchar", { length: 150, nullable: false })
    title!: string;

    @Column("text", { nullable: false })
    message!: string;

    @Column("timestamp", { nullable: false })
    sent_at!: Date;

    @Column({ type: "uuid", nullable: false })
    user_id!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user!: User;
}

export default Notice;