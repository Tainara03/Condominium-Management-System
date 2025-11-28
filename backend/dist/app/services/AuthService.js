"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'no_secret_key';
const JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN || "86400"); // default 1 day in seconds
const hashPassword = async (password) => {
    return bcrypt_1.default.hash(password, SALT_ROUNDS);
};
const comparePassword = async (password, hash) => {
    return bcrypt_1.default.compare(password, hash);
};
const signToken = (user) => {
    if (!user || !user.id || !user.email)
        throw new Error('User data is incomplete for signing token');
    const payload = { sub: user.id,
        email: user.email,
        role_id: user.role_id,
        role_level: user.role?.level ?? 0 };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (err) {
        throw new Error('Invalid or expired token');
    }
};
exports.default = { hashPassword, comparePassword, signToken, verifyToken };
//# sourceMappingURL=AuthService.js.map