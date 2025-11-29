import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Reservation from "./Reservation";

@Entity('areas_comuns')
class CommonAreas {
    @PrimaryGeneratedColumn('uuid', { name: "id_area" })
    id_area!: string;

    @Column('varchar', { length: 100, nullable: false })
    name!: string;

    @Column('int', { nullable: false })
    capacity!: number;

    @OneToMany(() => Reservation, reservation => reservation.area)
    reservations!: Reservation[];

}

export default CommonAreas;
