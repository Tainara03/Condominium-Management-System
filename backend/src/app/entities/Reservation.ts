import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import User from "./User";
import CommonAreas from "./CommonAreas";

@Entity('reservations')
class Reservation {

    @PrimaryGeneratedColumn('uuid')
    id!: string;   

    @Column({ type: "uuid", nullable: false })
    user_id!: string;  

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column({ type: "uuid", nullable: false })
    area_id!: string;

    @ManyToOne(() => CommonAreas, area => area.reservations)
    @JoinColumn({ name: "area_id", referencedColumnName: "id_area" })
    area!: CommonAreas;


    @Column('timestamp', { nullable: false })
    reservation_date_time!: Date;
}

export default Reservation;
