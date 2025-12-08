import { Request, Response, Router } from 'express';
import { QueryFailedError } from 'typeorm';
import { AuthRequest, ensureAuthenticated } from '../middlewares/authMiddleware'; 
import { permit } from '../middlewares/roleMiddleware'; 
import ReservationService from '../services/ReservationService'; 

const reservationRouter = Router();

reservationRouter.post('/', ensureAuthenticated, permit(1), async (req: AuthRequest, res: Response) => {
    try {
        const { area_id, reservation_date_time, description } = req.body;
        
        const user = (req as any).user;
        const user_id = user?.id;

        if (!user_id) {
            return res.status(401).json({ message: 'Erro: Usuário não identificado no sistema.' });
        }
        if (!area_id || !reservation_date_time) {
            return res.status(400).json({ message: 'Dados insuficientes para a reserva' });
        }
        
        const newReservation = await ReservationService.createReservation({
            user_id: req.user.id,
            area_id: area_id,
            reservation_date_time: new Date(reservation_date_time),
            description: description?? null
        });
        
        return res.status(201).json(newReservation);
    } catch (error: any) {
        console.error("ERRO NO POST DE RESERVA:", error);
        if (error.message?.includes('Reservation already exists')) {
            return res.status(409).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno ao salvar reserva.' });
    }
});

reservationRouter.get('/', ensureAuthenticated, permit(1), async (req: Request, res: Response) => {
    try {
        const { id } = req.query;
        let reservation;
        if (id) {
            reservation = await ReservationService.getReservationById(id as string);
        } else {
            reservation = await ReservationService.getAllReservations();
        }
        return res.status(200).json(reservation);
    } catch (error) {
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        if (error instanceof Error && error.message === 'Reservation not found') {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});

reservationRouter.put('/:id', ensureAuthenticated, permit(4), async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided for update' });
        }

        const updatedReservation = await ReservationService.updateReservation(id, req.body, req.user.id);
        if (!updatedReservation) {
            return res.status(404).json({ message: 'Could not update reservation' });
        }
        return res.status(200).json(updatedReservation); 
    } catch (error) {
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        if (error instanceof Error && error.message === 'Reservation not found') {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});

reservationRouter.delete('/:id', ensureAuthenticated, permit(4), async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await ReservationService.deleteReservation(id, req.user.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Could not delete reservation' });
        }

        return res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        if (error instanceof Error && error.message === 'Reservation not found') {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default reservationRouter;