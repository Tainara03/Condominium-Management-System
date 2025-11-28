"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UnitRepository_1 = __importDefault(require("../repositories/UnitRepository"));
const getUnitById = async (id) => {
    try {
        const unit = await UnitRepository_1.default.getUnitById(id);
        if (!unit) {
            throw new Error('Unit not found');
        }
        return unit;
    }
    catch (error) {
        throw error;
    }
};
const getUnitByApartmentAndBuilding = async (apartment, building) => {
    try {
        const unit = await UnitRepository_1.default.getUnitByApartmentAndBuilding(apartment, building);
        if (!unit) {
            throw new Error('Unit not found');
        }
        return unit;
    }
    catch (error) {
        throw error;
    }
};
const getAllUnits = async () => {
    try {
        const units = await UnitRepository_1.default.getAllUnits();
        if (!units || units.length === 0) {
            throw new Error('Unit not found');
        }
        return units;
    }
    catch (error) {
        throw error;
    }
};
const createUnit = async (unitData) => {
    try {
        const newUnit = await UnitRepository_1.default.createUnit(unitData);
        return newUnit;
    }
    catch (error) {
        throw error;
    }
};
const updateUnit = async (id, unitData) => {
    try {
        const unit = await UnitRepository_1.default.getUnitById(id);
        if (!unit) {
            throw new Error('Unit not found');
        }
        const updatedUnit = await UnitRepository_1.default.updateUnit(id, unitData);
        return updatedUnit;
    }
    catch (error) {
        throw error;
    }
};
const deleteUnit = async (id) => {
    try {
        const unit = await UnitRepository_1.default.getUnitById(id);
        if (!unit) {
            throw new Error('Unit not found');
        }
        const deleteResponse = await UnitRepository_1.default.deleteUnit(id);
        return deleteResponse;
    }
    catch (error) {
        throw error;
    }
};
exports.default = { getUnitById, getUnitByApartmentAndBuilding, getAllUnits, createUnit, updateUnit, deleteUnit };
//# sourceMappingURL=UnitService.js.map