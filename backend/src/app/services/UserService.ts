import UserRepository from "../repositories/UserRepository";
import IUser from "../interfaces/IUser";
import bcrypt from "bcrypt";

//Validações
const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePhone = (phone: string): boolean => {
  // Aceita formatos nacionais: (11) 99999-9999 ou 11999999999
  const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  return regex.test(phone);
};

const validatePassword = (password: string): boolean => {
  // Senha forte: mínimo 8, 1 minúscula, 1 maiúscula, 1 número
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

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
  try {
    const users = await UserRepository.getUsers();
    if (!users || users.length === 0) {
      throw new Error('User not found');
    }
    return users.map(mapUserForFrontend);
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id: string) => {
  try {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error('User not found');
    return mapUserForFrontend(user);
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error('User not found');
    return mapUserForFrontend(user);
  } catch (error) {
    throw error;
  }
};

const createUser = async (userData: IUser) => {
  // 1. Validações Básicas
  if (!userData.name || !userData.email || !userData.password_hash) {
    throw new Error("Missing required fields: name, email, and password are required.");
  }

  if (!validateEmail(userData.email)) throw new Error("Invalid email format");

  const existingUser = await UserRepository.findByEmail(userData.email);
  if (existingUser) throw new Error("Email already in use");

  if (userData.phone && !validatePhone(userData.phone)) {
    throw new Error("Invalid phone format");
  }

  // 2. Validação da Força da Senha
  if (!validatePassword(userData.password_hash)) {
    throw new Error(
      "Weak password: must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number"
    );
  }

  try {
    // 3. HASH DA SENHA
    // O número 10 representa o "salt rounds" (custo de processamento). 
    // Quanto maior, mais seguro, porém mais lento. 10 é o padrão atual da indústria.
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userData.password_hash, salt);

    // Substituímos a senha plana pelo hash antes de enviar ao repositório
    userData.password_hash = hash;

    const newUser = await UserRepository.createUser(userData);
    return mapUserForFrontend(newUser);
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id: string, userData: Partial<IUser>) => {
  const user = await UserRepository.findById(id);
  if (!user) throw new Error("User not found");

  // -------------------- VALIDAR EMAIL --------------------
  if (userData.email) {
    if (!validateEmail(userData.email)) {
      throw new Error("Invalid email format");
    }

    if (userData.email !== user.email) {
      const existing = await UserRepository.findByEmail(userData.email);
      if (existing) {
        throw new Error("Email already in use");
      }
    }
  }

  // -------------------- VALIDAR TELEFONE --------------------
  if (userData.phone) {
    if (!validatePhone(userData.phone)) {
      throw new Error("Invalid phone format");
    }
  }

  // -------------------- VALIDAR SENHA --------------------
  if (userData.password_hash) {
    if (!validatePassword(userData.password_hash)) {
      throw new Error(
        "Weak password: must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number"
      );
    }
  }

  const updated = await UserRepository.updateUser(id, userData);
  return updated;
};

const deleteUser = async (id: string) => {
    try {
        const user = await UserRepository.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        const deleted = await UserRepository.deleteUser(id);

        return deleted;
    } catch (error) {
        throw error;
    }
};
export default { getAllUsers, getUserByEmail, getUserById, updateUser, deleteUser, };