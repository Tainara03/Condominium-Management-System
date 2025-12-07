import { AppDataSource } from "../../database/data-source";
import Package from "../entities/Package";

const packageRepository = AppDataSource.getRepository(Package);

const getPackages = () => {
    return packageRepository.find({ relations: ["unit"] });
};

const getPackagesByUnit = (unit_id: string) => {
    return packageRepository.find({
        where: { unit_id },
        relations: ["unit"]
    });
};

const findById = (id: string) => {
    return packageRepository.findOne({
        where: { id },
        relations: ["unit"]
    });
};

const createPackage = async (data: Partial<Package>) => {
    const pkg = packageRepository.create(data);
    await packageRepository.save(pkg);
    return pkg;
};

const updatePackage = async (id: string, data: Partial<Package>) => {
    await packageRepository.update(id, data);
    return packageRepository.findOne({ where: { id } });
};

const deletePackage = async (id: string) => {
    const result = await packageRepository.delete(id);
    return result.affected !== 0;
};

export default {
    getPackages,
    getPackagesByUnit,
    findById,
    createPackage,
    updatePackage,
    deletePackage
};
