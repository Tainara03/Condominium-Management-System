import { Router } from 'express';
import userRouter from '../controllers/UserController';
import authRouter from '../controllers/AuthController';

const routers = Router();

routers.get("/", (req, res) => {
  return res.json({ status: "ok" });
});

routers.use('/auth', authRouter);
routers.use('/users', userRouter);

export default routers;
