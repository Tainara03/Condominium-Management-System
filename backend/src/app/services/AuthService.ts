import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import User from "../entities/User";
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'no_secret_key';
const JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN || "86400") ; // default 1 day in seconds

const hashPassword = async (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};


const signToken = (user: User) => {
    if (!user) throw new Error('User data is required to sign token');

    const payload = { sub: user.id,
                    email: user.email, 
                    role_id: user.role_id, 
                    role_level: user.role?.level ?? 0 };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as any;
};

export default { hashPassword, comparePassword, signToken, verifyToken };