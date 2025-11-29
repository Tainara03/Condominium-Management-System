import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import Unit from "./Unit";
import Role from "./Role"
import History from "./history";
/**
 * Arquivo de definição da tabela usuários,
 * É aqui que dizemos qual a estrurura da tabela para o typeorm
 */

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

    // armazena a FK role
    @Column({ type: "uuid", nullable: false })
    role_id!: string;

    // relacionamento com role
    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    role!: Role;

    // armazena a FK unit_id
    @Column({ type: "uuid", nullable: false })
    unit_id!: string;

    // relacionamento com unit
    @ManyToOne(() => Unit)
    @JoinColumn({ name: 'unit_id' })
    unit?: Unit

    @Column('boolean', { nullable: false, default: false })
    is_approved!: boolean;

    @OneToMany(() => History, history => history.performed_by)
    history!: History[];
}

export default User