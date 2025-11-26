import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserRepository from "../repositories/UserRepository";
import { toNamespacedPath } from "path";
import Unit from "../entities/Unit";
import { unsubscribe } from "diagnostics_channel";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'no_secret_key';

export interface AuthRequest extends Request {
    user?: any;
}

export const ensureAuthenticated = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Missing Token' });
        }

        const [, token] = authHeader.split(" ");
        if (!token) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as {
            sub: string,
            email: string,
            role_id: number,
            role_level: number
        };

        const user = await UserRepository.findById(decoded.sub);

        if (!user) {
            return res.status(401).json({ message: "User no longer exists" });
        }

        //O usuário deve estar aprovado pelo admin para acessar o sistema
        if (!user.is_approved) {
            return res.status(403).json({ message: "User not approved by admin" });
        }
        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role_id: user.role_id,
            role_level: user.role?.level ?? 0,
            unit_id: user.unit_id,
            is_approved: user.is_approved
        }

        return next();
    } catch (err: any) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(401).json({ message: 'Invalid token' });

    }
};
