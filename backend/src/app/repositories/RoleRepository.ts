import { AppDataSource } from "../../database/data-source";
import Role from "../entities/Role";

const RoleRepository = AppDataSource.getRepository(Role);

const findById = async (id: string) => {
    return RoleRepository.findOne({ where: { id } });
};

const findByName = async (roleName: string) => {
    return RoleRepository.findOne({ where: { role: roleName } });
};

const getAll = async () => {
    return RoleRepository.find();
};

const createRole = async (roleData: Partial<Role>) => {
    const newRole = RoleRepository.create(roleData);
    await RoleRepository.save(newRole);
    return newRole;
};

const updateRole = async (id: string, roleData: Partial<Role>) => {
    await RoleRepository.update(id, roleData);
    return RoleRepository.findOne({ where: { id } });
};

const deleteRole = async (id: string) => {
    const result = await RoleRepository.delete(id);
    return result.affected !== 0;
};

export default { findById, findByName, getAll, createRole, updateRole, deleteRole };
