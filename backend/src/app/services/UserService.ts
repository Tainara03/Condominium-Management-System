import UserRepository from "../repositories/UserRepository";
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


const updateUser = async (id: string, userData: Partial<IUser>) => {
    try {
        const user = await UserRepository.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        // se contem email no userData, verificar se ja existe outro usuario com esse email
        if (userData.email && userData.email !== user.email) {
            const existingUser = await UserRepository.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('Email already in use');
            }
        }
        
        const updatedUser = await UserRepository.updateUser(id, userData);

        return updatedUser;
    } catch (error) {
        throw error;
    }
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