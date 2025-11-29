import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ensureAuthenticated } from '../middlewares/authMiddleware';
import { permit } from '../middlewares/roleMiddleware';
import CommonAreasService from '../services/CommonAreasService';
import { Router } from 'express';

const commonAreasRouter = Router();

// GET áreas comuns
commonAreasRouter.get('/', ensureAuthenticated, permit(1), async (req: Request, res: Response) => {
    try {
        const { id_area, name } = req.query;

        let area;
        if (id_area) {
            area = await CommonAreasService.getAreaById(id_area as string);
        } else {
            area = await CommonAreasService.getAllAreas();
        }

        if (!area) {
            return res.status(404).json({ message: 'Common Area not found' });
        }

        return res.status(200).json(area);

    } catch (error) {
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// POST criar área comum
commonAreasRouter.post('/', ensureAuthenticated, permit(4), async (req: Request, res: Response) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided for creation' });
        }

        const newArea = await CommonAreasService.createArea(req.body);
        return res.status(201).json(newArea);

    } catch (error) {
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT atualizar área comum
commonAreasRouter.put('/:id_area', ensureAuthenticated, permit(4), async (req: Request, res: Response) => {
    try {
        const { id_area } = req.params;
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided for update' });
        }

        const updatedArea = await CommonAreasService.updateArea(id_area, req.body);
        if (!updatedArea) {
            return res.status(404).json({ message: 'Could not update Common Area' });
        }

        return res.status(200).json(updatedArea);

    } catch (error) {
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE remover área comum
commonAreasRouter.delete('/:id_area', ensureAuthenticated, permit(4), async (req: Request, res: Response) => {
    try {
        const { id_area } = req.params;

        const deleted = await CommonAreasService.deleteArea(id_area);
        if (!deleted) {
            return res.status(404).json({ message: 'Could not delete Common Area' });
        }

        return res.status(200).json({ message: 'Common Area deleted successfully' });

    } catch (error) {
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default commonAreasRouter;
