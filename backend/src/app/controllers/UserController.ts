import { Request, Response, Router } from "express";
import UserRepository from "../repositories/UserRepository";
import { ensureAuthenticated } from "../middlewares/authMiddleware";
import { permit } from "../middlewares/roleMiddleware";
import { QueryFailedError } from "typeorm";
import UserService from "../services/UserService";
import IUser from "../interfaces/IUser";
import { log } from "console";

const userRouter = Router();

//VALIDAR NIVEIS DE PERMISSÃO NECESSÁRIOS PARA CADA ROTA

//Listar todos os usuários, buscar por id ou email
userRouter.get('/', ensureAuthenticated, permit(1), async (req: Request, res: Response) => {
    console.log('Query Params:', req.query);
    try {
        const { id, email } = req.query;

        let user;
        if (id) {
            console.log('Fetching user by ID:', id);
            user = await UserService.getUserById(id as string);
        }else if (email) {
            console.log('Fetching user by Email:', email);
            user = await UserService.getUserByEmail(email as string);
        } else {
            console.log('Fetching all users');
            user = await UserService.getAllUsers();
        }

        return res.status(200).json(user);

    } catch (error) {
        console.error(error);
        //Se Der problema na query
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Querry Failed', error: error.message });
        }

        //Se retornar user not found
        if (error instanceof Error && error.message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }

        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }

});

//atualizar usuário
userRouter.put('/:id', ensureAuthenticated, permit(2), async (req: Request, res: Response) => {
    console.log('Request Params:', req.params);
    try {
        if (!req.params || Object.keys(req.params).length === 0) {
            return res.status(400).json({ message: "Bad request: request params are missing" });
        }
        const { id } = req.params;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided for update' });
        }
        
        const updatedUser = await UserService.updateUser(id, req.body);

        if (!updatedUser) {
            return res.status(404).json({ message: 'Could Not update User' });
        }

        return res.status(204).json(updatedUser);

    } catch (error) {
        console.log("............Catch............."+".............");
        //Se Der problema na query
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Querry failed', error: error.message });
        }
        //Se retornar user not found
        if (error instanceof Error && error.message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }
        // Se retornar email already in use
        if (error instanceof Error && error.message === 'Email already in use') {
            return res.status(409).json({ message: 'Email already in use' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Deletar usuário
userRouter.delete('/:id', ensureAuthenticated, permit(3), async (req: Request, res: Response) => {
    try {
        if (!req.params || Object.keys(req.params).length === 0) {
            return res.status(400).json({
                message: "Bad request: request params are missing"
            });
        }

        const deleteResponse = await UserService.deleteUser(req.params.id);


        if (!deleteResponse) {
            return res.status(404).json({ message: 'Failed to delete user' });
        }

        return res.status(204).send();
    }
    catch (error) {
        console.error(error);
        //Se Der problema na query
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Querry failed', error: error.message });
        }

        //Se retornar user not found
        if (error instanceof Error && error.message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }

        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default userRouter;