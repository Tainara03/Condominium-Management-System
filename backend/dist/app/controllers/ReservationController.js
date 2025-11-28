"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const ReservationService_1 = __importDefault(require("../services/ReservationService"));
const express_1 = require("express");
const reservationRouter = (0, express_1.Router)();
// Listar reservas ou buscar por id
reservationRouter.get('/', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(1), async (req, res) => {
    try {
        const { id } = req.query;
        let reservation;
        if (id) {
            reservation = await ReservationService_1.default.getReservationById(id);
        }
        else {
            reservation = await ReservationService_1.default.getAllReservations();
        }
        return res.status(200).json(reservation);
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        if (error instanceof Error && error.message === 'Reservation not found') {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// Criar nova reserva
reservationRouter.post('/', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(1), async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided for creation' });
        }
        const newReservation = await ReservationService_1.default.createReservation(req.body);
        return res.status(201).json(newReservation);
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        if (error instanceof Error && error.message === 'Reservation already exists') {
            return res.status(409).json({ message: 'Reservation already exists' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// Atualizar reserva
reservationRouter.put('/:id', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(4), async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided for update' });
        }
        const updatedReservation = await ReservationService_1.default.updateReservation(id, req.body);
        if (!updatedReservation) {
            return res.status(404).json({ message: 'Could not update reservation' });
        }
        return res.status(204).json(updatedReservation);
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        if (error instanceof Error && error.message === 'Reservation not found') {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// Deletar reserva
reservationRouter.delete('/:id', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(4), async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ReservationService_1.default.deleteReservation(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Could not delete reservation' });
        }
        return res.status(204).json({ message: 'Reservation deleted successfully' });
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        if (error instanceof Error && error.message === 'Reservation not found') {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = reservationRouter;
//# sourceMappingURL=ReservationController.js.map