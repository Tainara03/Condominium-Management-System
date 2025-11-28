"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const CommonAreasService_1 = __importDefault(require("../services/CommonAreasService"));
const express_1 = require("express");
const commonAreasRouter = (0, express_1.Router)();
// GET áreas comuns
commonAreasRouter.get('/', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(1), async (req, res) => {
    try {
        const { id_area, name } = req.query;
        let area;
        if (id_area) {
            area = await CommonAreasService_1.default.getAreaById(id_area);
        }
        else {
            area = await CommonAreasService_1.default.getAllAreas();
        }
        if (!area) {
            return res.status(404).json({ message: 'Common Area not found' });
        }
        return res.status(200).json(area);
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// POST criar área comum
commonAreasRouter.post('/', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(4), async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided for creation' });
        }
        const newArea = await CommonAreasService_1.default.createArea(req.body);
        return res.status(201).json(newArea);
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// PUT atualizar área comum
commonAreasRouter.put('/:id_area', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(4), async (req, res) => {
    try {
        const { id_area } = req.params;
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided for update' });
        }
        const updatedArea = await CommonAreasService_1.default.updateArea(id_area, req.body);
        if (!updatedArea) {
            return res.status(404).json({ message: 'Could not update Common Area' });
        }
        return res.status(200).json(updatedArea);
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// DELETE remover área comum
commonAreasRouter.delete('/:id_area', authMiddleware_1.ensureAuthenticated, (0, roleMiddleware_1.permit)(4), async (req, res) => {
    try {
        const { id_area } = req.params;
        const deleted = await CommonAreasService_1.default.deleteArea(id_area);
        if (!deleted) {
            return res.status(404).json({ message: 'Could not delete Common Area' });
        }
        return res.status(200).json({ message: 'Common Area deleted successfully' });
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = commonAreasRouter;
//# sourceMappingURL=CommonAreasController.js.map