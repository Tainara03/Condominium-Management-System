import CommonAreas from "../entities/CommonAreas";
import ICommonAreas from "../interfaces/ICommonAreas";
import { AppDataSource } from "../../database/data-source";

const commonAreasRepository = AppDataSource.getRepository(CommonAreas);

const getAreas = () => {
    return commonAreasRepository.find({ relations: ['reservation'] });
}

const getAreaById = (id_area: string) => {
    return commonAreasRepository.findOne({ where: { id_area }, relations: ['reservation'] });
};

const createArea = async (areaData: Partial<CommonAreas>) => {
    const newArea = commonAreasRepository.create(areaData);
    await commonAreasRepository.save(newArea);
    return newArea;
}

const updateArea = async (id_area: string, areaData: Partial<ICommonAreas>) => {
    commonAreasRepository.update(id_area, areaData);
    return commonAreasRepository.findOne({ where: { id_area }, relations: ['reservation'] });
}

const deleteArea = async (id_area: string) => {
    const result = await commonAreasRepository.delete(id_area);
    return result.affected !== 0;
}

export default { getAreas, getAreaById, createArea, updateArea, deleteArea };
