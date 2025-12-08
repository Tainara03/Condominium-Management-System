import PackageRepository from "../repositories/PackageRepository";
import IPackage from "../interfaces/IPackage";
import History from "./HistoryService";

const getPackageById = async (id: string) => {
    try {
        const pkg = await PackageRepository.findById(id);
        if (!pkg) {
            throw new Error("Package not found");
        }
        return pkg;
    } catch (error) {
        throw error;
    }
};

const getPackagesByUnit = async (unit_id: string) => {
    try {
        const packages = await PackageRepository.getPackagesByUnit(unit_id);
        return packages;
    } catch (error) {
        throw error;
    }
};

const getAllPackages = async () => {
    try {
        const packages = await PackageRepository.getPackages();
        return packages;
    } catch (error) {
        throw error;
    }
};

const createPackage = async (data: Partial<IPackage>, req_user: any) => {
    try {
        const newPackage = await PackageRepository.createPackage(data);

        if(newPackage){
            await History.registerEvent({
                        event_title: 'Encomenda Recebida',
                        table_name: 'reservations',
                        event_id: newPackage.id,
                        target_entity: newPackage.unit_id,
                        performed_by: req_user.user_id
                    });
        }
        return newPackage;
    } catch (error) {
        throw error;
    }
};

const updatePackage = async (id: string, data: Partial<IPackage>) => {
    try {
        const pkg = await PackageRepository.findById(id);

        if (!pkg) {
            throw new Error("Package not found");
        }

        const updated = await PackageRepository.updatePackage(id, data);
        return updated;
    } catch (error) {
        throw error;
    }
};

const deletePackage = async (id: string) => {
    try {
        const pkg = await PackageRepository.findById(id);

        if (!pkg) {
            throw new Error("Package not found");
        }

        const deleted = await PackageRepository.deletePackage(id);
        return deleted;
    } catch (error) {
        throw error;
    }
};

export default {
    getPackageById,
    getPackagesByUnit,
    getAllPackages,
    createPackage,
    updatePackage,
    deletePackage,
};