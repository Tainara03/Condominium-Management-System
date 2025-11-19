import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import User from "./User";

@Entity('units')
class Unit {
    
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('varchar', { length: 6, nullable:false })
    apartment!: string

    @Column('varchar', { length: 50, nullable: false })
    building!: string

    @OneToMany(() => User, (user) => user.unit)
    users!: User[]

}

export default Unit