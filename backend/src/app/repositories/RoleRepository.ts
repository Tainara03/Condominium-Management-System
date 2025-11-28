import { AppDataSource } from "../../database/data-source";
import Role from "../entities/Role";

const RoleRepository = AppDataSource.getRepository(Role);

const getRoleById = async (id: number) => {
    return RoleRepository.findOne({where: {id}});
};

const getRoleByName = async (roleName: string) => {
    return RoleRepository.findOne({where: {role: roleName}});
};

const getAllRoles = async () => {
    return RoleRepository.find();
}

const createRole = async (roleData: Partial<Role>) => {
    const newRole = RoleRepository.create(roleData);
    await RoleRepository.save(newRole);
    return newRole;
}

const updateRole = async (id: number, roleData: Partial<Role>) => {
    RoleRepository.update(id, roleData);
    return RoleRepository.findOne({where: {id}});
}

const deleteRole = async (id: number) => {
    const result = await RoleRepository.delete(id);
    return result.affected !== 0;
}

export default {getRoleById, getRoleByName, getAllRoles, createRole, updateRole, deleteRole};