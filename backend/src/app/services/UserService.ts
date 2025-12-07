import UserRepository from "../repositories/UserRepository";
import AuthService from "./AuthService";
import IUser from "../interfaces/IUser";

const mapUserForFrontend = (user: any) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    tipoUsuario: user.role?.role,
    status: user.is_approved === null ? 'Pendente' : user.is_approved ? 'Ativo' : 'Inativo',
    bloco: user.unit?.building,
    apartamento: user.unit?.apartment,
    comprovante_path: user.comprovante_path,
  };
};

const getAllUsers = async () => {
  const users = await UserRepository.getUsers();
  if (!users) throw new Error("User not found");
  return users.map(mapUserForFrontend);
};

const getUserById = async (id: string) => {
  const user = await UserRepository.findById(id);
  if (!user) throw new Error("User not found");
  return mapUserForFrontend(user);
};

const getUserByEmail = async (email: string) => {
  const user = await UserRepository.findByEmail(email);
  if (!user) throw new Error("User not found");
  return mapUserForFrontend(user);
};

// usado pelo login (retorna o usuário cru, sem map)
const getUserByEmailRaw = async (email: string) => {
  return await UserRepository.findByEmail(email);
};

const createUser = async (userData: {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role_id: string;
  unit_id: string;
  comprovante_path?: string;
}) => {
  const { name, email, phone, password, role_id, unit_id, comprovante_path } = userData;

  // verificar e-mail duplicado
  const exists = await UserRepository.findByEmail(email);
  if (exists) throw new Error("Email already exists");

  const password_hash = await AuthService.hashPassword(password);

  const created = await UserRepository.createUser({
    name,
    email,
    phone,
    password_hash,
    role_id,
    unit_id,
    comprovante_path,
    is_approved: undefined,
  });

  return created;
};

const updateUser = async (id: string, data: Partial<IUser>) => {
  const user = await UserRepository.findById(id);
  if (!user) throw new Error("User not found");

  // validar e-mail duplicado
  if (data.email && data.email !== user.email) {
    const exists = await UserRepository.findByEmail(data.email);
    if (exists) throw new Error("Email already in use");
  }

  // se tentar atualizar a senha
  if ((data as any).password) {
    (data as any).password_hash = await AuthService.hashPassword((data as any).password);
    delete (data as any).password; // remove para evitar conflito
  }

  const updated = await UserRepository.updateUser(id, data);
  return updated;
};

const deleteUser = async (id: string) => {
  const user = await UserRepository.findById(id);
  if (!user) throw new Error("User not found");
  return await UserRepository.deleteUser(id);
};

export default {
  getAllUsers,
  getUserByEmail,
  getUserByEmailRaw,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};