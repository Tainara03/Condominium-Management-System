"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RoleRepository_1 = __importDefault(require("../repositories/RoleRepository"));
const getRoleById = async (id) => {
    try {
        const role = await RoleRepository_1.default.getRoleById(id);
        if (!role) {
            throw new Error('Role not found');
        }
        return role;
    }
    catch (error) {
        throw error;
    }
};
const getRoleByName = async (roleName) => {
    try {
        const role = await RoleRepository_1.default.getRoleByName(roleName);
        if (!role) {
            throw new Error('Role not found');
        }
        return role;
    }
    catch (error) {
        throw error;
    }
};
const getAllRoles = async () => {
    try {
        const roles = await RoleRepository_1.default.getAllRoles();
        if (!roles || roles.length === 0) {
            throw new Error('Role not found');
        }
        return roles;
    }
    catch (error) {
        throw error;
    }
};
const createRole = async (roleData) => {
    try {
        const existingRole = await RoleRepository_1.default.getRoleByName(roleData.role);
        if (existingRole) {
            throw new Error('Role already exists');
        }
        const newRole = await RoleRepository_1.default.createRole(roleData);
        return newRole;
    }
    catch (error) {
        throw error;
    }
};
const updateRole = async (id, roleData) => {
    try {
        const role = await RoleRepository_1.default.getRoleById(id);
        if (!role) {
            throw new Error('Role not found');
        }
        const updatedRole = await RoleRepository_1.default.updateRole(id, roleData);
        return updatedRole;
    }
    catch (error) {
        throw error;
    }
};
const deleteRole = async (id) => {
    try {
        const role = await RoleRepository_1.default.getRoleById(id);
        if (!role) {
            throw new Error('Role not found');
        }
        const deleted = await RoleRepository_1.default.deleteRole(id);
        return deleted;
    }
    catch (error) {
        throw error;
    }
};
exports.default = { getRoleById, getRoleByName, getAllRoles, createRole, updateRole, deleteRole };
//# sourceMappingURL=RoleService.js.map