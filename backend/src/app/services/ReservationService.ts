import { AppDataSource } from "../../database/data-source";
import Reservation from "../entities/Reservation";

interface IRequest {
    area_id: string;
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

const createReservation = async (reservationData: Partial<Reservation>) => {
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
        
        return newReservation;
    } catch (error) {
        throw error;
    }
};

const updateReservation = async (id: string, reservationData: Partial<Reservation>) => {
    try {
        const result = await reservationRepository.update(id, reservationData);
        if (result.affected === 0) {
            throw new Error('Reservation not found');
        }
        const updatedReservation = await reservationRepository.findOneBy({ id });
        return updatedReservation;
    } catch (error) {
        throw error;
    }
};

const deleteReservation = async (id: string) => {
    try {
        const deleteResult = await reservationRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new Error('Reservation not found');
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