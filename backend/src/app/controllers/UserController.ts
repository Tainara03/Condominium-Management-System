import { Request, Response, Router } from "express";
import UserRepository from "../repositories/UserRepository";
import { ensureAuthenticated } from "../middlewares/authMiddleware";
import { permit } from "../middlewares/roleMiddleware";
import { QueryFailedError } from "typeorm";
import UserService from "../services/UserService";
import IUser from "../interfaces/IUser";
import path from 'path';
import fs from 'fs';
import { uploadMiddleware } from "../middlewares/uploadMiddleware";

const userRouter = Router();

//VALIDAR NIVEIS DE PERMISSÃO NECESSÁRIOS PARA CADA ROTA

//Listar todos os usuários, buscar por id ou email
userRouter.get('/', ensureAuthenticated, permit(1), async (req: Request, res: Response) => {
    try {
        const { id, email } = req.query;

        let user;
        if (id) {
            user = await UserService.getUserById(id as string);
        }else if (email) {
            user = await UserService.getUserByEmail(email as string);
        } else {
            user = await UserService.getAllUsers();
        }

        return res.status(200).json(user);

    } catch (error) {
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

userRouter.get('/:id/comprovante', ensureAuthenticated, async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);

    if (!user?.comprovante_path) {
      return res.status(404).json({ message: 'Comprovante não encontrado' });
    }

    const filePath = path.resolve(user.comprovante_path);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Arquivo não encontrado' });
    }

    res.download(filePath, `comprovante-${user.name}.pdf`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao baixar comprovante' });
  }
});

//atualizar usuário
userRouter.put('/:id', ensureAuthenticated, permit(1), uploadMiddleware.single('comprovante'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (req.file) {
      data.comprovante_path = req.file.path;
    }

    const updatedUser = await UserService.updateUser(id, data);

    if (!updatedUser) {
      return res.status(404).json({ message: 'Could Not update User' });
    }

    return res.status(200).json(updatedUser);

  } catch (error) {

    if (error instanceof QueryFailedError) {
      return res.status(400).json({ message: 'Querry failed', error: error.message });
    }
    if (error instanceof Error && error.message === 'User not found') {
      return res.status(404).json({ message: 'User not found' });
    }
    if (error instanceof Error && error.message === 'Email already in use') {
      return res.status(409).json({ message: 'Email already in use' });
    }
    
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Aprovar usuário (pendente -> ativo)
userRouter.post('/:id/approve', ensureAuthenticated, permit(3), async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserService.updateUser(req.params.id, { is_approved: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Reprovar usuário (pendente -> removido)
userRouter.delete('/:id/reject', ensureAuthenticated, permit(3), async (req: Request, res: Response) => {
  try {
    const deletedUser = await UserService.deleteUser(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Alternar status de usuário ativo/inativo
userRouter.post('/:id/status', ensureAuthenticated, permit(3), async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const isApproved = status === 'Ativo' ? true : false;
    const updatedUser = await UserService.updateUser(req.params.id, { is_approved: isApproved });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// Deletar usuário
userRouter.delete('/:id', ensureAuthenticated, permit(4), async (req: Request, res: Response) => {
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