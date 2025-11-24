import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";

export interface AuthRequest extends Request {
  user?: any;
}

export const ensureAuthenticated = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing Token' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Invalid token format' });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ message: 'Invalid token format' });

  try {
    const payload = AuthService.verifyToken(token);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
