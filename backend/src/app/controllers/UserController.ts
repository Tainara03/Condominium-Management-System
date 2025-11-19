import { Request, Response, Router } from "express";
import User from "../entities/User";
import UserRepository from "../repositories/UserRepository";
import IUser from "../interfaces/IUser";

const userRouter = Router();

userRouter.get('/', async (req: Request, res: Response): Promise<Response> => {
    const users = await UserRepository.getUsers();
    return res.status(200).json(users);
})

//
//Metodos a serem criados
//userRouter.post('/')
// userRouter.put('/')
// userRouter.delete('/')


export default userRouter;