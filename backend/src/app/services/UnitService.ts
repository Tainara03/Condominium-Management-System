import UnitRepository from "../repositories/UnitRepository";
import { Request, Response, Router } from "express";
import { AppDataSource } from "../../database/data-source";
import Unit from "../entities/Unit";
import { ensureAuthenticated } from "../middlewares/authMiddleware";

const unitsRouter = Router();

unitsRouter.get('/', ensureAuthenticated, async (req: Request, res: Response) => {
    try {
        const repository = AppDataSource.getRepository(Unit);
        
        const units = await repository.find({
            order: {
                building: "ASC",
                apartment: "ASC"
            }
        });
        
        return res.json(units);
    } catch (error) {
        console.error("Erro ao listar unidades:", error);
        return res.status(500).json({ message: "Erro interno ao buscar unidades" });
    }
});

const getUnitById = async (id: string) => {
    try {
        const unit = await UnitRepository.findById(id);
        if (!unit) {
            throw new Error('Unit not found');
        }
        return unit;
    } catch (error) {
        throw error;
    }
};

const getUnitByApartmentAndBuilding = async (apartment: string, building: string) => {
    try {
        const unit = await UnitRepository.findByComposite(apartment, building);
        if (!unit) {
            throw new Error('Unit not found');
        }
        return unit;
    } catch (error) {
        throw error;
    }
};

const getAllUnits = async () => {
    try {
        const units = await UnitRepository.getAll();
        if (!units || units.length === 0) {
            throw new Error('Unit not found');
        }
        return units;
    } catch (error) {
        throw error;
    }
};

const createUnit = async (unitData: Partial<Unit>) => {
    try {
        const newUnit = await UnitRepository.createUnit(unitData);
        return newUnit;
    }
    catch (error) {
        throw error;
    }
};

const updateUnit = async (id: string, unitData: Partial<Unit>) => {
    try {
        const unit = await UnitRepository.findById(id);
        if (!unit) {
            throw new Error('Unit not found');
        }

        const updatedUnit = await UnitRepository.updateUnit(id, unitData);
        return updatedUnit;
    } catch (error) {
        throw error;
    }
};

const deleteUnit = async (id: string) => {
    try {
        const unit = await UnitRepository.findById(id);
        if (!unit) {
            throw new Error('Unit not found');
        }
        
        const deleteResponse = await UnitRepository.deleteUnit(id);
        return deleteResponse;
    } catch (error) {
        throw error;
    }
};

export default {unitsRouter, getUnitById, getUnitByApartmentAndBuilding, getAllUnits, createUnit, updateUnit, deleteUnit};