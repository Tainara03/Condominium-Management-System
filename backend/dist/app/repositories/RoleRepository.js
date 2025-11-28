"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../database/data-source");
const Role_1 = __importDefault(require("../entities/Role"));
const RoleRepository = data_source_1.AppDataSource.getRepository(Role_1.default);
const getRoleById = async (id) => {
    return RoleRepository.findOne({ where: { id } });
};
const getRoleByName = async (roleName) => {
    return RoleRepository.findOne({ where: { role: roleName } });
};
const getAllRoles = async () => {
    return RoleRepository.find();
};
const createRole = async (roleData) => {
    const newRole = RoleRepository.create(roleData);
    await RoleRepository.save(newRole);
    return newRole;
};
const updateRole = async (id, roleData) => {
    RoleRepository.update(id, roleData);
    return RoleRepository.findOne({ where: { id } });
};
const deleteRole = async (id) => {
    const result = await RoleRepository.delete(id);
    return result.affected !== 0;
};
exports.default = { getRoleById, getRoleByName, getAllRoles, createRole, updateRole, deleteRole };
//# sourceMappingURL=RoleRepository.js.map