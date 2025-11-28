"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const typeorm_1 = require("typeorm");
const RoleService_1 = __importDefault(require("../services/RoleService"));
const roleRouter = (0, express_1.Router)();
//Listar todos os roles, buscar por id ou nome
roleRouter.get('/', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(1), async (req, res) => {
    try {
        const { id, role } = req.query;
        let roleData;
        if (id) {
            roleData = await RoleService_1.default.getRoleById(id);
        }
        else if (role) {
            roleData = await RoleService_1.default.getRoleByName(role);
        }
        else {
            roleData = await RoleService_1.default.getAllRoles();
        }
        return res.status(200).json(roleData);
    }
    catch (error) {
        //Se Der problema na query
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Querry Failed', error: error.message });
        }
        //Se retornar role not found
        if (error instanceof Error && error.message === 'Role not found') {
            return res.status(404).json({ message: 'Role not found' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});
//Criar novo role
roleRouter.post('/', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(4), async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Bad request: request body is missing or malformed." });
        }
        const roleData = req.body;
        const newRole = await RoleService_1.default.createRole(roleData);
        return res.status(201).json(newRole);
    }
    catch (error) {
        //Se tentar criar um role que já existe
        if (error instanceof Error && error.message === 'Role already exists') {
            return res.status(409).json({ message: 'Conflict: Role already exists' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});
//atualizar role
roleRouter.put('/:id', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(4), async (req, res) => {
    try {
        if (!req.params || Object.keys(req.params).length === 0) {
            return res.status(400).json({ message: "Bad request: request params are missing" });
        }
        const { id } = req.params;
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Bad request: no data provided for update' });
        }
        const updatedRole = await RoleService_1.default.updateRole(id, req.body);
        if (!updatedRole) {
            return res.status(404).json({ message: 'Could Not update Role' });
        }
        return res.status(204).json(updatedRole);
    }
    catch (error) {
        //Se Der problema na query
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Querry failed', error: error.message });
        }
        //Se retornar role not found
        if (error instanceof Error && error.message === 'Role not found') {
            return res.status(404).json({ message: 'Role not found' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});
//deletar role
roleRouter.delete('/:id', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(4), async (req, res) => {
    try {
        if (!req.params || Object.keys(req.params).length === 0) {
            return res.status(400).json({ message: "Bad request: request params are missing" });
        }
        const { id } = req.params;
        const deleted = await RoleService_1.default.deleteRole(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Could Not delete Role' });
        }
        return res.status(204).json({ message: 'Role deleted successfully' });
    }
    catch (error) {
        //Se Der problema na query
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Querry failed', error: error.message });
        }
        //Se retornar role not found
        if (error instanceof Error && error.message === 'Role not found') {
            return res.status(404).json({ message: 'Role not found' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = roleRouter;
//# sourceMappingURL=RoleController.js.map