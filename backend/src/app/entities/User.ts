import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Unit from "./Unit";
import Role from "./Role";
import History from "./history";

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('varchar', { length: 100, nullable: false })
    name!: string;

    @Column('varchar', { length: 100, nullable: false, unique: true })
    email!: string;

    @Column('varchar', { length: 255, nullable: false })
    password_hash!: string;

    @Column('varchar', { length: 20, nullable: true })
    phone?: string;

    @Column({ type: "uuid", nullable: false })
    role_id!: string;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    role!: Role;

    @Column({ type: "uuid", nullable: false })
    unit_id!: string;

    @ManyToOne(() => Unit)
    @JoinColumn({ name: 'unit_id' })
    unit?: Unit;

    @Column('boolean', { nullable: false, default: false })
    is_approved!: boolean | null;

    @OneToMany(() => History, history => history.performed_by)
    history!: History[];

    @Column('varchar', { length: 255, nullable: true })
    comprovante_path?: string;
}

export default User;
