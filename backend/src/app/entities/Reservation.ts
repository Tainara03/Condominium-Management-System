import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany } from "typeorm";
import CommonAreas from "./CommonAreas";
import User
 from "./User";
@Entity('reservations')
class Reservation {

    @PrimaryGeneratedColumn('uuid', { name: 'reservation_id' })
    id!: string;

    @ManyToOne(() => User, user => user.reservations)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column({ type: "uuid" })
    user_id!: string;

    @Column({ type: "uuid", nullable: false })
    area_id!: string;

    @ManyToOne(() => CommonAreas, area => area.reservations)
    @JoinColumn({ name: "area_id", referencedColumnName: "id_area" })
    area!: CommonAreas;

    @Column('timestamp', { nullable: false, name: 'reservation_date' })
    reservation_date_time!: Date;

    @Column('text', { nullable: true })
    description?: string;
}

export default Reservation;