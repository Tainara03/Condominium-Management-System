"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const getUserById = async (id) => {
    try {
        const user = await UserRepository_1.default.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    catch (error) {
        throw error;
    }
};
const getUserByEmail = async (email) => {
    try {
        const user = await UserRepository_1.default.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    catch (error) {
        throw error;
    }
};
// function that geta all users, or by id or email
const getAllUsers = async () => {
    try {
        const users = await UserRepository_1.default.getUsers();
        if (!users || users.length === 0) {
            throw new Error('User not found');
        }
        return users;
    }
    catch (error) {
        throw error;
    }
};
const updateUser = async (id, userData) => {
    try {
        const user = await UserRepository_1.default.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        // se contem email no userData, verificar se ja existe outro usuario com esse email
        if (userData.email && userData.email !== user.email) {
            const existingUser = await UserRepository_1.default.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('Email already in use');
            }
        }
        const updatedUser = await UserRepository_1.default.updateUser(id, userData);
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
};
const deleteUser = async (id) => {
    try {
        const user = await UserRepository_1.default.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        const deleted = await UserRepository_1.default.deleteUser(id);
        return deleted;
    }
    catch (error) {
        throw error;
    }
};
exports.default = { getAllUsers, getUserByEmail, getUserById, updateUser, deleteUser, };
//# sourceMappingURL=UserService.js.map