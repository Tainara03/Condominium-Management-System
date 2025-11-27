import { Response, NextFunction } from "express";
import { AuthRequest } from './authMiddleware';

export const permit = (minLevel: number) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Not authenticated' });

    const level = user.role_level ?? 0;
    if (level >= minLevel) return next();

    return res.status(403).json({ message: 'Forbidden' });
  };
};
