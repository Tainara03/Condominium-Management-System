import User from "../entities/User";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";

const userRepository = AppDataSource.getRepository(User);

const getUsers = () => {
  return userRepository.find({
    relations: ["unit", "role"],
  });
};

const findByName = (name: string) => {
  return userRepository.findOne({
    where: { name },
    relations: ["role", "unit"],
  });
};

const findByEmail = (email: string) => {
  return userRepository.findOne({
    where: { email },
    relations: ["role", "unit"],
  });
};

const findById = (id: string) => {
  return userRepository.findOne({
    where: { id },
    relations: ["role", "unit"],
  });
};

const createUser = async (data: Partial<IUser>) => {
  const created = userRepository.create(data);
  await userRepository.save(created);
  return created;
};

const updateUser = async (id: string, data: Partial<IUser>) => {
  await userRepository.update(id, data);
  return userRepository.findOne({ where: { id } });
};

const deleteUser = async (id: string) => {
  const result = await userRepository.delete(id);
  return result.affected !== 0;
};

export default {
  getUsers,
  findByEmail,
  findById,
  findByName,
  createUser,
  updateUser,
  deleteUser,
};