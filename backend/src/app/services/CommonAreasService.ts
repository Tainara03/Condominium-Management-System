import CommonAreasRepository from "../repositories/CommonAreasRepository";
import CommonAreas from "../entities/CommonAreas";

const getAreaById = async (id_area: string) => {
    try {
        const area = await CommonAreasRepository.getAreaById(id_area);
        if (!area) {
            throw new Error('Area not found');
        }
        return area;
    } catch (error) {
        throw error;
    }
};

const getAllAreas = async () => {
    try {
        const areas = await CommonAreasRepository.getAreas();
        if (!areas || areas.length === 0) {
            throw new Error('No areas found');
        }
        return areas;
    } catch (error) {
        throw error;
    }
};

const createArea = async (areaData: Partial<CommonAreas>) => {
    try {
        const newArea = await CommonAreasRepository.createArea(areaData);
        return newArea;
    } catch (error) {
        throw error;
    }
};

const updateArea = async (id_area: string, areaData: Partial<CommonAreas>) => {
    try {
        const area = await CommonAreasRepository.getAreaById(id_area);
        if (!area) {
            throw new Error('Area not found');
        }

        const updatedArea = await CommonAreasRepository.updateArea(id_area, areaData);
        return updatedArea;
    } catch (error) {
        throw error;
    }
};

const deleteArea = async (id_area: string) => {
    try {
        const area = await CommonAreasRepository.getAreaById(id_area);
        if (!area) {
            throw new Error('Area not found');
        }

        const deleteResponse = await CommonAreasRepository.deleteArea(id_area);
        return deleteResponse;
    } catch (error) {
        throw error;
    }
};

export default {
    getAreaById,
    getAllAreas,
    createArea,
    updateArea,
    deleteArea
};
