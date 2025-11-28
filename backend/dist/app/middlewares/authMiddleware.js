"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'no_secret_key';
const ensureAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Missing Token' });
        }
        const [, token] = authHeader.split(" ");
        if (!token) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = await UserRepository_1.default.findById(decoded.sub);
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
        };
        return next();
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.ensureAuthenticated = ensureAuthenticated;
//# sourceMappingURL=authMiddleware.js.map