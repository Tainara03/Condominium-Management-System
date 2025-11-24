import { Request, Response, Router } from "express";
import UserRepository from "../repositories/UserRepository";
import { ensureAuthenticated } from "../middlewares/authMiddleware";
import { permit } from "../middlewares/roleMiddleware";


const userRouter = Router();

//VALIDAR NIVEIS DE PERMISSÃO NECESSÁRIOS PARA CADA ROTA

//Listar todos os usuários
userRouter.get('/', ensureAuthenticated, permit(1), async (req: Request, res: Response) => {
  const users = await UserRepository.getUsers();
  return res.status(200).json(users);
});

//buscar usuário por id
userRouter.get('/:id', ensureAuthenticated, permit(1), async (req: Request, res: Response) => {
  const user = await UserRepository.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  return res.json(user);
});

//atualizar usuário
userRouter.put('/:id', ensureAuthenticated, permit(2), async (req: Request, res: Response) => {
  const { id } = req.params;
  await UserRepository.updateUser(id, req.body);
  return res.status(204).send();
});

// Deletar usuário
userRouter.delete('/:id', ensureAuthenticated, permit(3), async (req: Request, res: Response) => {
  await UserRepository.deleteUser(req.params.id);
  return res.status(204).send();
});

export default userRouter;