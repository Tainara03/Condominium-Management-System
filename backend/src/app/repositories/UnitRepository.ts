
import { AppDataSource } from "../../database/data-source";
import Unit from "../entities/Unit";

const UnitRepository = AppDataSource.getRepository(Unit);

//buscar unidade por id
const getUnitById = async (id: string) => {
    return UnitRepository.findOne({where: {id}});
};

//buscar unidade por apartment e building
const getUnitByApartmentAndBuilding = async (apartment: string, building: string) => {
    return UnitRepository.findOne({where: {apartment, building}});
};


//buscar todas as unidades
const getAllUnits = async () => {
    return UnitRepository.find();
}

const createUnit = async (unitData: Partial<Unit>) => {
    const newUnit = UnitRepository.create(unitData);
    await UnitRepository.save(newUnit);
    return newUnit;
}

const updateUnit = async (id: string, userData: Partial<Unit>) => {
    UnitRepository.update(id, userData);
    return UnitRepository.findOne({where: {id}});
}

const deleteUnit = async (id: string) => {
    const result = await UnitRepository.delete(id);
    return result.affected !== 0;
}


export default {getUnitById,getUnitByApartmentAndBuilding,getAllUnits,createUnit,updateUnit, deleteUnit};