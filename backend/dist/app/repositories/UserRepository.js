"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../entities/User"));
const data_source_1 = require("../../database/data-source");
const userRepository = data_source_1.AppDataSource.getRepository(User_1.default);
const getUsers = () => {
    return userRepository.find({ relations: ['role', 'unit'] });
};
const findByEmail = (email) => {
    return userRepository.findOne({ where: { email }, relations: ['role', 'unit'] });
};
const findById = (id) => {
    return userRepository.findOne({ where: { id }, relations: ['role', 'unit'] });
};
const createUser = async (userData) => {
    const newUser = userRepository.create(userData);
    await userRepository.save(newUser);
    return newUser;
};
const updateUser = async (id, userData) => {
    userRepository.update(id, userData);
    return userRepository.findOne({ where: { id } });
};
const deleteUser = async (id) => {
    const result = await userRepository.delete(id);
    return result.affected !== 0;
};
exports.default = { getUsers, findByEmail, findById, createUser, updateUser, deleteUser };
//# sourceMappingURL=UserRepository.js.map