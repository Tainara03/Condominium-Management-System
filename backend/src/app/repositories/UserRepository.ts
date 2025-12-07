import User from "../entities/User";
import { AppDataSource } from "../../database/data-source";

const userRepository = AppDataSource.getRepository(User);

const getUsers = async () => userRepository.find({ relations: ['unit', 'role'] });

const findByEmail = (email: string) =>
  userRepository.findOne({ where: { email }, relations: ['role', 'unit'] });

const findById = (id: string) =>
  userRepository.findOne({ where: { id }, relations: ['role', 'unit'] });

const createUser = async (data: Partial<User>) => {
  const newUser = userRepository.create(data);
  await userRepository.save(newUser);
  return newUser;
};

const updateUser = async (id: string, data: any) => {
  await userRepository.update(id, data);
  return userRepository.findOne({ where: { id } });
};

const deleteUser = async (id: string) => {
  const res = await userRepository.delete(id);
  return res.affected !== 0;
};

export default { getUsers, findByEmail, findById, createUser, updateUser, deleteUser };