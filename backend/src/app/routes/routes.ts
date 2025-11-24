import { Router } from 'express';
import userRouter from '../controllers/UserController';
import authRouter from '../controllers/AuthController';

const routers = Router();

routers.use('/auth', authRouter);
routers.use('/users', userRouter);

export default routers;
