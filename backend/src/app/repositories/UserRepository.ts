import User from "../entities/User";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";

const userRepository = AppDataSource.getRepository(User);

const getUsers = () => {
    return userRepository.find({relations: ['role','unit']});
}

const findByEmail = (email: string) => {
    return userRepository.findOne({where: {email}, relations:['role', 'unit']});
}

const findById = (id: string) => {
    return userRepository.findOne({where: {id}, relations:['role', 'unit']});
}

const createUser = async (userData: IUser) => {
    const newUser = userRepository.create(userData);
    await userRepository.save(newUser);
    return newUser;
}

const updateUser = async (id: string, userData: Partial<IUser>) => {
    userRepository.update(id, userData);
}

const deleteUser = async (id: string) => {
    const result = await userRepository.delete(id);
    return result.affected !== 0;
}

export default { getUsers, findByEmail, findById, createUser, updateUser, deleteUser };