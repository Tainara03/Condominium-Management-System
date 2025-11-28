import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity('roles')
class Role {
    
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column('varchar', { length: 50, nullable: false})
    role!: string

    @Column('int', {nullable: false})
    level!: number

    @OneToMany(()=> User, (user) => user.role)
    users!: User[]
}

export default Role