import { Request, Response, Router } from 'express';
import { QueryFailedError } from 'typeorm';
import { ensureAuthenticated } from '../middlewares/authMiddleware';
import { permit } from '../middlewares/roleMiddleware';
import PackageService from '../services/PackageService';

const packageRouter = Router();

packageRouter.post('/', ensureAuthenticated, permit(2), async (req: Request, res: Response) => {
    try {
        const { description, unit_id, received_at } = req.body;

        if (!description || !unit_id || !received_at) {
            return res.status(400).json({ message: 'Dados insuficientes para criar o pacote' });
        }

        const newPackage = await PackageService.createPackage({
            description,
            unit_id,
            received_at
        });

        return res.status(201).json(newPackage);
    } catch (error: any) {
        console.error('ERRO AO CRIAR PACOTE:', error);

        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Falha na Query', error: error.message });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
});

packageRouter.get('/', ensureAuthenticated, async (req: Request, res: Response) => {
    try {
        const { id, unit_id } = req.query;
        let pkg;

        if (id) {
            pkg = await PackageService.getPackageById(id as string);
        } else if (unit_id) {
            pkg = await PackageService.getPackagesByUnit(unit_id as string);
        } else {
            pkg = await PackageService.getAllPackages();
        }

        return res.status(200).json(pkg);
    } catch (error: any) {
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        if (error.message === 'Package not found') {
            return res.status(404).json({ message: 'Package not found' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});

packageRouter.put('/:id', ensureAuthenticated, permit(2), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided for update' });
        }

        const updatedPackage = await PackageService.updatePackage(id, req.body);

        if (!updatedPackage) {
            return res.status(404).json({ message: 'Could not update package' });
        }

        return res.status(200).json(updatedPackage);
    } catch (error: any) {
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        if (error.message === 'Package not found') {
            return res.status(404).json({ message: 'Package not found' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});

packageRouter.delete('/:id', ensureAuthenticated, permit(2), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await PackageService.deletePackage(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Could not delete package' });
        }

        return res.status(200).json({ message: 'Package deleted successfully' });
    } catch (error: any) {
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        if (error.message === 'Package not found') {
            return res.status(404).json({ message: 'Package not found' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default packageRouter;
