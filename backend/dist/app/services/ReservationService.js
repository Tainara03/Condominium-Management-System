"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReservationRepository_1 = __importDefault(require("../repositories/ReservationRepository"));
const getReservationById = async (id) => {
    try {
        const reservation = await ReservationRepository_1.default.findById(id);
        if (!reservation) {
            throw new Error('Reservation not found');
        }
        return reservation;
    }
    catch (error) {
        throw error;
    }
};
const getAllReservations = async () => {
    try {
        const reservations = await ReservationRepository_1.default.getReservations();
        if (!reservations || reservations.length === 0) {
            throw new Error('No reservations found');
        }
        return reservations;
    }
    catch (error) {
        throw error;
    }
};
const createReservation = async (reservationData) => {
    try {
        const newReservation = await ReservationRepository_1.default.createReservation(reservationData);
        return newReservation;
    }
    catch (error) {
        throw error;
    }
};
const updateReservation = async (id, reservationData) => {
    try {
        const reservation = await ReservationRepository_1.default.findById(id);
        if (!reservation) {
            throw new Error('Reservation not found');
        }
        const updatedReservation = await ReservationRepository_1.default.updateReservation(id, reservationData);
        return updatedReservation;
    }
    catch (error) {
        throw error;
    }
};
const deleteReservation = async (id) => {
    try {
        const reservation = await ReservationRepository_1.default.findById(id);
        if (!reservation) {
            throw new Error('Reservation not found');
        }
        const deleteResponse = await ReservationRepository_1.default.deleteReservation(id);
        return deleteResponse;
    }
    catch (error) {
        throw error;
    }
};
exports.default = {
    getReservationById,
    getAllReservations,
    createReservation,
    updateReservation,
    deleteReservation
};
//# sourceMappingURL=ReservationService.js.map