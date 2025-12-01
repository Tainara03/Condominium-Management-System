import { AppDataSource } from "../../database/data-source";
import Unit from "../entities/Unit";

const UnitRepository = AppDataSource.getRepository(Unit);

const findById = async (id: string) => {
    return UnitRepository.findOne({ where: { id } });
};

const findByComposite = async (composite: string) => {
    const [building, apartment] = composite.split("-");
    return UnitRepository.findOne({ where: { building, apartment } });
};

const getAll = async () => {
    return UnitRepository.find();
};

const createUnit = async (unitData: Partial<Unit>) => {
    const newUnit = UnitRepository.create(unitData);
    await UnitRepository.save(newUnit);
    return newUnit;
};

const updateUnit = async (id: string, unitData: Partial<Unit>) => {
    await UnitRepository.update(id, unitData);
    return UnitRepository.findOne({ where: { id } });
};

const deleteUnit = async (id: string) => {
    const result = await UnitRepository.delete(id);
    return result.affected !== 0;
};

export default { findById, findByComposite, getAll, createUnit, updateUnit, deleteUnit };
