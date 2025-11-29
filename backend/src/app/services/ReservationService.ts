import ReservationRepository from "../repositories/ReservationRepository";
import Reservation from "../entities/Reservation";

const getReservationById = async (id: string) => {
    try {
        const reservation = await ReservationRepository.findById(id);
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
        const reservations = await ReservationRepository.getReservations();
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
        const newReservation = await ReservationRepository.createReservation(reservationData);
        return newReservation;
    } catch (error) {
        throw error;
    }
};

const updateReservation = async (id: string, reservationData: Partial<Reservation>) => {
    try {
        const reservation = await ReservationRepository.findById(id);
        if (!reservation) {
            throw new Error('Reservation not found');
        }

        const updatedReservation = await ReservationRepository.updateReservation(id, reservationData);
        return updatedReservation;
    } catch (error) {
        throw error;
    }
};

const deleteReservation = async (id: string) => {
    try {
        const reservation = await ReservationRepository.findById(id);
        if (!reservation) {
            throw new Error('Reservation not found');
        }

        const deleteResponse = await ReservationRepository.deleteReservation(id);
        return deleteResponse;
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
