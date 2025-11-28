import RoleRepository from "../repositories/RoleRepository";
import IRole from "../interfaces/IRole";


const getRoleById = async (id: number) => {
    try {
        const role = await RoleRepository.getRoleById(id);
        if (!role) {
            throw new Error('Role not found');
        }
        return role;
    } catch (error) {
        throw error;
    }
};

const getRoleByName = async (roleName: string) => {
    try {
        const role = await RoleRepository.getRoleByName(roleName);
        if (!role) {
            throw new Error('Role not found');
        }
        return role;
    } catch (error) {
        throw error;
    }
};

const getAllRoles = async () => {
    try {
        const roles = await RoleRepository.getAllRoles();
        if (!roles || roles.length === 0) {
            throw new Error('Role not found');
        }
        return roles;
    } catch (error) {
        throw error;
    }
};

const createRole = async (id:number, roleData: Partial<IRole>) => {
    try {
        const existingRole = await RoleRepository.getRoleByName(roleData.role!);
        if (existingRole) {
            throw new Error('Role already exists');
        }
        const newRole = await RoleRepository.createRole(roleData);
        return newRole;
    } catch (error) {
        throw error;
    }
};

const updateRole = async (id: number, roleData: Partial<IRole>) => {
    try {
        const role = await RoleRepository.getRoleById(id);
        if (!role) {
            throw new Error('Role not found');
        }
        const updatedRole = await RoleRepository.updateRole(id, roleData);
        return updatedRole;
    } catch (error) {
        throw error;
    }   
};

const deleteRole = async (id: number) => {
    try {
        const role = await RoleRepository.getRoleById(id);
        if (!role) {
            throw new Error('Role not found');
        }
        const deleted = await RoleRepository.deleteRole(id);
        return deleted;
    } catch (error) {
        throw error;
    }
};

export default {getRoleById, getRoleByName, getAllRoles, createRole, updateRole, deleteRole};