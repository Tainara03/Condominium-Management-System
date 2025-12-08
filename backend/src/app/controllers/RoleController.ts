import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "../middlewares/authMiddleware";
import { permit } from "../middlewares/roleMiddleware";
import { QueryFailedError } from "typeorm";
import RoleService from "../services/RoleService";
import IRole from "../interfaces/IRole";

const roleRouter = Router();

//Listar todos os roles, buscar por id ou nome
roleRouter.get('/', ensureAuthenticated, permit(1), async (req: Request, res: Response) => {
    try {
        const { id, role } = req.query;
        let roleData;
        if (id) {
            roleData = await RoleService.getRoleById(id as string);
        } else if (role) {
            roleData = await RoleService.getRoleByName(role as string);
        } else {
            roleData = await RoleService.getAllRoles();
        } 
        return res.status(200).json(roleData);
    } catch (error) {
        //Se Der problema na query
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Query Failed', error: error.message });
        }

        //Se retornar role not found
        if (error instanceof Error && error.message === 'Role not found') {
            return res.status(404).json({ message: 'Role not found' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//Criar novo role
roleRouter.post('/', ensureAuthenticated, permit(4), async (req: Request, res: Response) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Bad request: request body is missing or malformed." });
        }
        const roleData: Partial<IRole> = req.body;
        const newRole = await RoleService.createRole(roleData);
        return res.status(201).json(newRole);
    } catch (error) {
        //Se tentar criar um role que já existe
        if (error instanceof Error && error.message === 'Role already exists') {
            return res.status(409).json({ message: 'Conflict: Role already exists' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//atualizar role
roleRouter.put('/:id', ensureAuthenticated, permit(4), async (req: Request, res: Response) => {
    try {
        if (!req.params || Object.keys(req.params).length === 0) {
            return res.status(400).json({ message: "Bad request: request params are missing" });
        }
        const { id } = req.params;
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Bad request: no data provided for update' });
        }

        const updatedRole = await RoleService.updateRole(id, req.body);

        if (!updatedRole) {
            return res.status(404).json({ message: 'Could Not update Role' });
        }

        return res.status(204).json(updatedRole);
    } catch (error) {
        //Se Der problema na query
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        //Se retornar role not found
        if (error instanceof Error && error.message === 'Role not found') {
            return res.status(404).json({ message: 'Role not found' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//deletar role
roleRouter.delete('/:id', ensureAuthenticated, permit(4), async (req: Request, res: Response) => {
    try {
        if (!req.params || Object.keys(req.params).length === 0) {
            return res.status(400).json({ message: "Bad request: request params are missing" });
        }
        const { id } = req.params;
        const deleted = await RoleService.deleteRole(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Could Not delete Role' });
        }
        return res.status(204).json({ message: 'Role deleted successfully' });
    } catch (error) {
        //Se Der problema na query
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        //Se retornar role not found
        if (error instanceof Error && error.message === 'Role not found') {
            return res.status(404).json({ message: 'Role not found' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default roleRouter;

