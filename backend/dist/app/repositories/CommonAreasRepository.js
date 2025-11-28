"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommonAreas_1 = __importDefault(require("../entities/CommonAreas"));
const data_source_1 = require("../../database/data-source");
const commonAreasRepository = data_source_1.AppDataSource.getRepository(CommonAreas_1.default);
const getAreas = () => {
    return commonAreasRepository.find({ relations: ['reservation'] });
};
const getAreaById = (id_area) => {
    return commonAreasRepository.findOne({ where: { id_area }, relations: ['reservation'] });
};
const createArea = async (areaData) => {
    const newArea = commonAreasRepository.create(areaData);
    await commonAreasRepository.save(newArea);
    return newArea;
};
const updateArea = async (id_area, areaData) => {
    commonAreasRepository.update(id_area, areaData);
    return commonAreasRepository.findOne({ where: { id_area }, relations: ['reservation'] });
};
const deleteArea = async (id_area) => {
    const result = await commonAreasRepository.delete(id_area);
    return result.affected !== 0;
};
exports.default = { getAreas, getAreaById, createArea, updateArea, deleteArea };
//# sourceMappingURL=CommonAreasRepository.js.map