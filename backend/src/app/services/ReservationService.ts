import { AppDataSource } from "../../database/data-source";
import Reservation from "../entities/Reservation";
import History from "./HistoryService"

interface IRequest {
    area_id: string;
    user_id: string;
    reservation_date_time: Date;
    description?: string;
}

const reservationRepository = AppDataSource.getRepository(Reservation);

const getReservationById = async (id: string) => {
    try {
        const reservation = await reservationRepository.findOneBy({ id });
        if (!reservation) {
            throw new Error('Reservation not found');
        }
        return reservation;
    } catch (error) {
        throw error;
    }
};

const getAllReservations = async () => {
    try {
        const reservations = await reservationRepository.find({ relations: ['user', 'area'] });
        if (!reservations || reservations.length === 0) {
            throw new Error('No reservations found');
        }
        return reservations;
    } catch (error) {
        throw error;
    }
};

const createReservation = async (reservationData: IRequest) => {
    try {
        const existingReservation = await reservationRepository.findOneBy({
            area_id: reservationData.area_id,
            reservation_date_time: reservationData.reservation_date_time
        });
        
        if (existingReservation) {
            throw new Error('Reservation already exists');
        }
        const newReservation = reservationRepository.create(reservationData);
        await reservationRepository.save(newReservation);

        await History.registerEvent({
            event_title: 'Reserva criada',
            table_name: 'reservations',
            event_id: newReservation.id,
            //unidade ou usuário
            target_entity: newReservation.user_id,
            performed_by: newReservation.user_id
        });
        return newReservation;
    } catch (error) {
        throw error;
    }
};

const updateReservation = async (id: string, reservationData: Partial<Reservation>, user_id: string) => {
    try {
        const result = await reservationRepository.update(id, reservationData);
        if (result.affected === 0) {
            throw new Error('Reservation not found');
        }
        const updatedReservation = await reservationRepository.findOneBy({ id });

        if (updatedReservation) {
            await History.registerEvent({
                event_title: 'Reserva alterada',
                table_name: 'reservations',
                event_id: updatedReservation.id,
                //unidade ou usuário
                target_entity: user_id,
                performed_by: user_id
            });
        }
        return updatedReservation;
    } catch (error) {
        throw error;
    }
};

const deleteReservation = async (id: string, user_id:string) => {
    try {
        const reservation = await getReservationById(id);
        const deleteResult = await reservationRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new Error('Reservation not found');
        }

        if(deleteResult.affected){
            await History.registerEvent({
                event_title: 'Reserva deletada',
                table_name: 'reservations',
                event_id: reservation.id,
                //unidade ou usuário
                target_entity: reservation.user_id,
                performed_by: user_id
            });
        }

        return { affected: deleteResult.affected };
    } catch (error) {
        throw error;
    }
};

export default {
    getReservationById,
    getAllReservations,
    createReservation,
    updateReservation,
    deleteReservation
};