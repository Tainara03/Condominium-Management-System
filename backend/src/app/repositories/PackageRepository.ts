import { AppDataSource } from "../../database/data-source";
import Package from "../entities/Package";

const packageRepository = AppDataSource.getRepository(Package);

const getPackages = () => {
    return packageRepository.find({ relations: ["user"] });
};

const getPackagesByUser = (user_id: string) => {
    return packageRepository.find({
        where: { user_id },
        relations: ["user"]
    });
};

const findById = (id: string) => {
    return packageRepository.findOne({
        where: { id },
        relations: ["user"]
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
    getPackagesByUser,
    findById,
    createPackage,
    updatePackage,
    deletePackage
};
