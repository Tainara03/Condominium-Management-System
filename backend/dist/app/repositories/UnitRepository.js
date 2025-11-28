"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../database/data-source");
const Unit_1 = __importDefault(require("../entities/Unit"));
const UnitRepository = data_source_1.AppDataSource.getRepository(Unit_1.default);
//buscar unidade por id
const getUnitById = async (id) => {
    return UnitRepository.findOne({ where: { id } });
};
//buscar unidade por apartment e building
const getUnitByApartmentAndBuilding = async (apartment, building) => {
    return UnitRepository.findOne({ where: { apartment, building } });
};
//buscar todas as unidades
const getAllUnits = async () => {
    return UnitRepository.find();
};
const createUnit = async (unitData) => {
    const newUnit = UnitRepository.create(unitData);
    await UnitRepository.save(newUnit);
    return newUnit;
};
const updateUnit = async (id, userData) => {
    UnitRepository.update(id, userData);
    return UnitRepository.findOne({ where: { id } });
};
const deleteUnit = async (id) => {
    const result = await UnitRepository.delete(id);
    return result.affected !== 0;
};
exports.default = { getUnitById, getUnitByApartmentAndBuilding, getAllUnits, createUnit, updateUnit, deleteUnit };
//# sourceMappingURL=UnitRepository.js.map