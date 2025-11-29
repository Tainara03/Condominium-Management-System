import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import User from "./User";
import Billing from "./Billing";

@Entity('units')
class Unit {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('varchar', { length: 6, nullable: false })
    apartment!: string

    @Column('varchar', { length: 50, nullable: false })
    building!: string

    @OneToMany(() => User, (user) => user.unit)
    users!: User[]

    @OneToMany(() => Billing, (billing) => billing.unit)
    billings!: Billing[];
}

export default Unit