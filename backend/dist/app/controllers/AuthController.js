"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
const authRouter = (0, express_1.Router)();
// Register
authRouter.post('/register', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Bad request: request body is missing or malformed."
            });
        }
        const { name, email, password, phone, role_id, unit_id } = req.body;
        // validações básicas
        if (!email || !password || !name || !role_id || !unit_id) {
            return res.status(400).json({ message: "Bad request: missing required fields." });
        }
        const isValid = typeof name === "string" &&
            typeof email === "string" &&
            typeof password === "string" &&
            typeof phone === "string" &&
            typeof role_id === "string" &&
            typeof unit_id === "string";
        if (!isValid) {
            return res.status(400).json({ message: "Bad request: invalid input data" });
        }
        const existing = await UserRepository_1.default.findByEmail(email);
        if (existing) {
            return res.status(409).json({ message: "Conflict: Email already exists." });
        }
        //Verficar se a unidade existe
        //verificar se o role existe
        const password_hash = await AuthService_1.default.hashPassword(password);
        const created = await UserRepository_1.default.createUser({ name, email, password_hash, phone, role_id, unit_id, is_approved: false });
        const token = AuthService_1.default.signToken(created);
        return res.status(201).json({
            user: {
                id: created.id, name: created.name, email: created.email, role: created.role, unit: created.unit
            }, token
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
// Login
authRouter.post('/login', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Bad request: request body is missing or malformed."
            });
        }
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Bad request: missing required fields.' });
        }
        const user = await UserRepository_1.default.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: invalid credentials' });
        }
        const ok = await AuthService_1.default.comparePassword(password, user.password_hash);
        if (!ok) {
            return res.status(401).json({ message: 'Unauthorized: invalid credentials' });
        }
        const token = AuthService_1.default.signToken(user);
        return res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, unit: user.unit } });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = authRouter;
//# sourceMappingURL=AuthController.js.map