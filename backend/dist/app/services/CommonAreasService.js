"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommonAreasRepository_1 = __importDefault(require("../repositories/CommonAreasRepository"));
const getAreaById = async (id_area) => {
    try {
        const area = await CommonAreasRepository_1.default.getAreaById(id_area);
        if (!area) {
            throw new Error('Area not found');
        }
        return area;
    }
    catch (error) {
        throw error;
    }
};
const getAllAreas = async () => {
    try {
        const areas = await CommonAreasRepository_1.default.getAreas();
        if (!areas || areas.length === 0) {
            throw new Error('No areas found');
        }
        return areas;
    }
    catch (error) {
        throw error;
    }
};
const createArea = async (areaData) => {
    try {
        const newArea = await CommonAreasRepository_1.default.createArea(areaData);
        return newArea;
    }
    catch (error) {
        throw error;
    }
};
const updateArea = async (id_area, areaData) => {
    try {
        const area = await CommonAreasRepository_1.default.getAreaById(id_area);
        if (!area) {
            throw new Error('Area not found');
        }
        const updatedArea = await CommonAreasRepository_1.default.updateArea(id_area, areaData);
        return updatedArea;
    }
    catch (error) {
        throw error;
    }
};
const deleteArea = async (id_area) => {
    try {
        const area = await CommonAreasRepository_1.default.getAreaById(id_area);
        if (!area) {
            throw new Error('Area not found');
        }
        const deleteResponse = await CommonAreasRepository_1.default.deleteArea(id_area);
        return deleteResponse;
    }
    catch (error) {
        throw error;
    }
};
exports.default = {
    getAreaById,
    getAllAreas,
    createArea,
    updateArea,
    deleteArea
};
//# sourceMappingURL=CommonAreasService.js.map