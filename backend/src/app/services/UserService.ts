import UserRepository from "../repositories/UserRepository"; 
import IUser from "../interfaces/IUser";
import bcrypt from "bcrypt";

// -------------------- VALIDAÇÕES --------------------
const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  return regex.test(phone);
};

const validatePassword = (password: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

// -------------------- MAP --------------------
const mapUserForFrontend = (user: any) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  tipoUsuario: user.role?.role,
  status: user.is_approved === null ? 'Pendente' : user.is_approved ? 'Ativo' : 'Inativo',
  bloco: user.unit?.building,
  apartamento: user.unit?.apartment,
  comprovante_path: user.comprovante_path,
});

// -------------------- SERVICE --------------------
const getAllUsers = async () => {
  const users = await UserRepository.getUsers();
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

// -------------------- CREATE / REGISTER USER --------------------
const registerUser = async (userData: IUser) => {

  if (!validateEmail(userData.email)) throw new Error("Invalid email format");

  if (userData.phone && !validatePhone(userData.phone)) {
    throw new Error("Invalid phone format");
  }

  if (!validatePassword(userData.password_hash)) {
    throw new Error("Weak password: must contain uppercase, lowercase, number, 8+ chars");
  }

  const existing = await UserRepository.findByEmail(userData.email);
  if (existing) throw new Error("Email already in use");

  const salt = await bcrypt.genSalt(10);
  userData.password_hash = await bcrypt.hash(userData.password_hash, salt);

  const newUser = await UserRepository.createUser(userData);
  return mapUserForFrontend(newUser);
};

// -------------------- UPDATE --------------------
const updateUser = async (id: string, userData: Partial<IUser>) => {
  const user = await UserRepository.findById(id);
  if (!user) throw new Error("User not found");

  if (userData.email) {
    if (!validateEmail(userData.email)) throw new Error("Invalid email format");
    if (userData.email !== user.email) {
      const exists = await UserRepository.findByEmail(userData.email);
      if (exists) throw new Error("Email already in use");
    }
  }

  if (userData.phone && !validatePhone(userData.phone)) {
    throw new Error("Invalid phone format");
  }

  if (userData.password_hash && !validatePassword(userData.password_hash)) {
    throw new Error("Weak password");
  }

  return UserRepository.updateUser(id, userData);
};

const deleteUser = async (id: string) => {
  const user = await UserRepository.findById(id);
  if (!user) throw new Error("User not found");
  return UserRepository.deleteUser(id);
};

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  registerUser,
  updateUser,
  deleteUser,
};