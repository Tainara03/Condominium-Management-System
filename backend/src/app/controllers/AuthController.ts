import { Router, Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import AuthService from '../services/AuthService';
import User from '../entities/User';
import Unit from '../entities/Unit';
const authRouter = Router();

// Register
authRouter.post('/register', async (req: Request, res: Response) => {
    try {
        
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Bad request: request body is missing or malformed."
            });
        }

        const { name, email, password, phone, role_id, unit_id } = req.body;

        // validações básicas
        if (!email || !password || !name || !role_id || !unit_id) {
            return res.status(400).json({ message: "All data are required" });
        }

        const isValid =
            typeof name === "string" &&
            typeof email === "string" &&
            typeof password === "string" &&
            typeof phone === "string" &&
            typeof role_id === "number" &&
            typeof unit_id === "number";

        
        if (!isValid) {
            return res.status(400).json({message: "Invalid input data" });
        }

        const existing = await UserRepository.findByEmail(email);
        if (existing) {
            return res.status(409).json({ message: "Email already exists." });
        }

        //Verficar se a unidade existe
        //verificar se o role existe
        

        const password_hash = await AuthService.hashPassword(password);

        const created = await UserRepository.createUser(
            { name, email, password_hash, phone, role_id, unit_id, is_approved: false });

        const token = AuthService.signToken(created);

        return res.status(201).json(
            {
                user: {
                    id: created.id, name: created.name, email: created.email, role: created.role, unit: created.unit
                }, token
            });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Login
authRouter.post('/login', async (req: Request<{}, {}, { email: string; password: string }>, res: Response) => {
    try {
        
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Bad request: request body is missing or malformed."
            });
        }

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'email and password are required.' });
        }

        const user = await UserRepository.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'invalid credentials' });
        }

        const ok = await AuthService.comparePassword(password, user.password_hash);
        if (!ok) {
            return res.status(401).json({ message: 'invalid credentials' });
        }

        const token = AuthService.signToken(user);
        return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, unit: user.unit } });

    } catch (error: any) {
        return res.status(500).json({ message: `Internal server error ${error.message}`, detail: error });
    }
});

export default authRouter;