import { Router, Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import AuthService from '../services/AuthService';
import User from '../entities/User';
const authRouter = Router();

// Register
authRouter.post('/register', async (req: Request, res: Response) => {
  const { name, email, password, phone, role_id, unit_id } = req.body;

  // validações básicas
  if (!email || !password || !name) return res.status(400).json({ message: "name, email and password are required." });

  const existing = await UserRepository.findByEmail(email);
  if (existing) return res.status(409).json({ message: "Email already exists." });

  const password_hash = await AuthService.hashPassword(password);

  const created = await UserRepository.createUser(
    {name, email, password_hash, phone, role_id, unit_id, is_active: true} as Partial<User>);

  const token = AuthService.signToken(created as User);

  return res.status(201).json({ user: { id: created.id, name: created.name, email: created.email }, token });
});

// Login
authRouter.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password are required.' });

  const user = await UserRepository.findByEmail(email);
  if (!user) return res.status(401).json({ message: 'invalid credentials' });

  const ok = await AuthService.comparePassword(password, user.password_hash);
  if (!ok) return res.status(401).json({ message: 'invalid credentials' });

  const token = AuthService.signToken(user);
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

export default authRouter;