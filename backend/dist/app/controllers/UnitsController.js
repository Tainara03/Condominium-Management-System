"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const UnitService_1 = __importDefault(require("../services/UnitService"));
const express_1 = require("express");
const unitRouter = (0, express_1.Router)();
unitRouter.get('/', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(1), async (req, res) => {
    try {
        const { id, apartment, building } = req.query;
        let unit;
        if (id) {
            unit = await UnitService_1.default.getUnitById(id);
        }
        else if (apartment && building) {
            unit = await UnitService_1.default.getUnitByApartmentAndBuilding(apartment, building);
        }
        else {
            unit = await UnitService_1.default.getAllUnits();
        }
        return res.status(200).json(unit);
    }
    catch (error) {
        //Se Der problema na query
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Querry Failed', error: error.message });
        }
        //Se retornar unit not found
        if (error instanceof Error && error.message === 'Unit not found') {
            return res.status(404).json({ message: 'Unit not found' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});
//atualizar unidade
unitRouter.put('/:id', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(4), async (req, res) => {
    try {
        if (!req.params || Object.keys(req.params).length === 0) {
            return res.status(400).json({ message: "Bad request: request params are missing" });
        }
        const { id } = req.params;
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided for update' });
        }
        const updatedUnit = await UnitService_1.default.updateUnit(id, req.body);
        if (!updatedUnit) {
            return res.status(404).json({ message: 'Could Not update Unit' });
        }
        return res.status(204).json(updatedUnit);
    }
    catch (error) {
        //Se Der problema na query
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Querry failed', error: error.message });
        }
        //Se retornar unit not found
        if (error instanceof Error && error.message === 'Unit not found') {
            return res.status(404).json({ message: 'Unit not found' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});
//criar unidade
unitRouter.post('/', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(4), async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided for creation' });
        }
        const newUnit = await UnitService_1.default.createUnit(req.body);
        return res.status(201).json(newUnit);
    }
    catch (error) {
        //Se Der problema na query
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Querry failed', error: error.message });
        }
        //se retornar unit already exists
        if (error instanceof Error && error.message === 'Unit already exists') {
            return res.status(409).json({ message: 'Unit already exists' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});
//deletar unidade
unitRouter.delete('/:id', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(4), async (req, res) => {
    try {
        if (!req.params || Object.keys(req.params).length === 0) {
            return res.status(400).json({ message: "Bad request: request params are missing" });
        }
        const { id } = req.params;
        const deleted = await UnitService_1.default.deleteUnit(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Could Not delete Unit' });
        }
        return res.status(204).json({ message: 'Unit deleted successfully' });
    }
    catch (error) {
        //Se Der problema na query
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Querry failed', error: error.message });
        }
        //Se retornar unit not found
        if (error instanceof Error && error.message === 'Unit not found') {
            return res.status(404).json({ message: 'Unit not found' });
        }
        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = unitRouter;
//# sourceMappingURL=UnitsController.js.map