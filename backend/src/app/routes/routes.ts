import { Router } from 'express';
import userRouter from '../controllers/UserController';
import authRouter from '../controllers/AuthController';
import BillingRouter from '../controllers/BillingController';
import { uploadMiddleware } from '../middlewares/uploadMiddleware';
import reservationRouter from '../controllers/ReservationController';
import unitsRouter from '../controllers/UnitsController';
import rolesRouter from '../controllers/RoleController';
import publicRouter from '../controllers/PublicController';
import historyRouter from '../controllers/HistoryController';

const routers = Router();

routers.get("/", (req, res) => {
  return res.json({ status: "ok" });
});

routers.use('/auth', authRouter);
routers.use('/users', userRouter);
routers.use('/reservas', reservationRouter);
routers.use('/units', unitsRouter);
routers.use('/roles', rolesRouter);
routers.use('/public', publicRouter);
routers.use('/history', historyRouter)
routers.post('/cobrancas', BillingRouter);

export default routers;