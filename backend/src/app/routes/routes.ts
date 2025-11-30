import { Router } from 'express';
import userRouter from '../controllers/UserController';
import authRouter from '../controllers/AuthController';
import { BillingController } from '../controllers/BillingController';
import { uploadMiddleware } from '../middlewares/uploadMiddleware';
import reservationRouter from '../controllers/ReservationController';

const routers = Router();
const billingController = new BillingController();

routers.get("/", (req, res) => {
  return res.json({ status: "ok" });
});

routers.use('/auth', authRouter);
routers.use('/users', userRouter);
routers.use('/reservas', reservationRouter);

routers.post('/cobrancas', uploadMiddleware.single('file'), billingController.store);

export default routers;