import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ensureAuthenticated } from '../middlewares/authMiddleware';
import { permit } from '../middlewares/roleMiddleware';
import UnitService from '../services/UnitService';
import { Router } from 'express';

const unitRouter = Router();

unitRouter.get('/', ensureAuthenticated, permit(1), async (req: Request, res: Response) => {
    try {
        const { id, apartment, building } = req.query;

        let unit;
        if (id) {
            unit = await UnitService.getUnitById(id as string);
        } else if (apartment && building) {
            unit = await UnitService.getUnitByApartmentAndBuilding(apartment as string, building as string);
        } else {
            unit = await UnitService.getAllUnits();
        }
        return res.status(200).json(unit);

    } catch (error) {
        //Se Der problema na query
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Querry Failed', error: error.message });
        }
        //Se retornar unit not found
        if (error instanceof Error && error.message === 'Unit not found') {
            return res.status(404).json({ message: 'Unit not found' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//atualizar unidade
unitRouter.put('/:id', ensureAuthenticated, permit(4), async (req: Request, res: Response) => {
    try {
        if (!req.params || Object.keys(req.params).length === 0) {
            return res.status(400).json({ message: "Bad request: request params are missing" });
        }
        const { id } = req.params;
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided for update' });
        }
        const updatedUnit = await UnitService.updateUnit(id, req.body);
        if (!updatedUnit) {
            return res.status(404).json({ message: 'Could Not update Unit' });
        }
        return res.status(204).json(updatedUnit);
    } catch (error) {
        //Se Der problema na query
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Querry failed', error: error.message });
        }
        //Se retornar unit not found
        if (error instanceof Error && error.message === 'Unit not found') {
            return res.status(404).json({ message: 'Unit not found' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//criar unidade
unitRouter.post('/', ensureAuthenticated, permit(4), async (req: Request, res: Response) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided for creation' });
        }
        const newUnit = await UnitService.createUnit(req.body);
        return res.status(201).json(newUnit);
    } catch (error) {
        //Se Der problema na query
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Querry failed', error: error.message });
        }
        //se retornar unit already exists
        if (error instanceof Error && error.message === 'Unit already exists') {
            return res.status(409).json({ message: 'Unit already exists' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//deletar unidade
unitRouter.delete('/:id', ensureAuthenticated, permit(4), async (req: Request, res: Response) => {
    try {
        if (!req.params || Object.keys(req.params).length === 0) {
            return res.status(400).json({ message: "Bad request: request params are missing" });
        }
        const { id } = req.params;
        const deleted = await UnitService.deleteUnit(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Could Not delete Unit' });
        }
        
        return res.status(204).json({ message: 'Unit deleted successfully' });
    } catch (error) {
        //Se Der problema na query
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Querry failed', error: error.message });
        }
        //Se retornar unit not found
        if (error instanceof Error && error.message === 'Unit not found') {
            return res.status(404).json({ message: 'Unit not found' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default unitRouter;

