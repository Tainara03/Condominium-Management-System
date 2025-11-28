import UnitRepository from "../repositories/UnitRepository";
import Unit from "../entities/Unit";

const getUnitById = async (id: number) => {
    try {
        const unit = await UnitRepository.getUnitById(id);
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
        const unit = await UnitRepository.getUnitByApartmentAndBuilding(apartment, building);
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
        const units = await UnitRepository.getAllUnits();
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

const updateUnit = async (id: number, unitData: Partial<Unit>) => {
    try {
        const unit = await UnitRepository.getUnitById(id);
        if (!unit) {
            throw new Error('Unit not found');
        }

        const updatedUnit = await UnitRepository.updateUnit(id, unitData);
        return updatedUnit;
    } catch (error) {
        throw error;
    }
};

const deleteUnit = async (id: number) => {
    try {
        const unit = await UnitRepository.getUnitById(id);
        if (!unit) {
            throw new Error('Unit not found');
        }
        
        const deleteResponse = await UnitRepository.deleteUnit(id);
        return deleteResponse;
    } catch (error) {
        throw error;
    }
};

export default {getUnitById, getUnitByApartmentAndBuilding, getAllUnits, createUnit, updateUnit, deleteUnit};