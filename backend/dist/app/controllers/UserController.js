"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const typeorm_1 = require("typeorm");
const UserService_1 = __importDefault(require("../services/UserService"));
const userRouter = (0, express_1.Router)();
//VALIDAR NIVEIS DE PERMISSÃO NECESSÁRIOS PARA CADA ROTA
//Listar todos os usuários, buscar por id ou email
userRouter.get('/', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(1), async (req, res) => {
    try {
        const { id, email } = req.query;
        let user;
        if (id) {
            user = await UserService_1.default.getUserById(id);
        }
        else if (email) {
            user = await UserService_1.default.getUserByEmail(email);
        }
        else {
            user = await UserService_1.default.getAllUsers();
        }
        return res.status(200).json(user);
    }
    catch (error) {
        //Se Der problema na query
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Querry Failed', error: error.message });
        }
        //Se retornar user not found
        if (error instanceof Error && error.message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});
//atualizar usuário
userRouter.put('/:id', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(3), async (req, res) => {
    try {
        if (!req.params || Object.keys(req.params).length === 0) {
            return res.status(400).json({ message: "Bad request: request params are missing" });
        }
        const { id } = req.params;
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided for update' });
        }
        const updatedUser = await UserService_1.default.updateUser(id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'Could Not update User' });
        }
        return res.status(204).json(updatedUser);
    }
    catch (error) {
        //Se Der problema na query
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Querry failed', error: error.message });
        }
        //Se retornar user not found
        if (error instanceof Error && error.message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }
        // Se retornar email already in use
        if (error instanceof Error && error.message === 'Email already in use') {
            return res.status(409).json({ message: 'Email already in use' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// Deletar usuário
userRouter.delete('/:id', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(4), async (req, res) => {
    try {
        if (!req.params || Object.keys(req.params).length === 0) {
            return res.status(400).json({
                message: "Bad request: request params are missing"
            });
        }
        const deleteResponse = await UserService_1.default.deleteUser(req.params.id);
        if (!deleteResponse) {
            return res.status(404).json({ message: 'Failed to delete user' });
        }
        return res.status(204).send();
    }
    catch (error) {
        //Se Der problema na query
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Querry failed', error: error.message });
        }
        //Se retornar user not found
        if (error instanceof Error && error.message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = userRouter;
//# sourceMappingURL=UserController.js.map