import UserRepository from "../repositories/UserRepository";
import UnitRepository from "../repositories/UnitRepository";
import IUser from "../interfaces/IUser";

interface UpdateUserData extends Partial<IUser> {
  unidades?: { bloco: string; apartment: string }[];
  userType?: 'Admin' | 'Sindico' | 'Morador' | 'Funcionario' | null;
}

const mapUserForFrontend = (user: any) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  userTypeDisplay: user.role?.role,
  status: user.is_approved === null ? 'Pendente' : user.is_approved ? 'Ativo' : 'Inativo',
  unidades: user.unit ? [{ bloco: user.unit.building, apartment: user.unit.apartment }] : [],
  comprovante_path: user.comprovante_path,
});

const getAllUsers = async () => {
  const users = await UserRepository.getUsers();
  if (!users || users.length === 0) throw new Error('User not found');
  return users.map(mapUserForFrontend);
};

const getUserById = async (id: string) => {
  const user = await UserRepository.findById(id);
  if (!user) throw new Error('User not found');
  return mapUserForFrontend(user);
};

const getUserByEmail = async (email: string) => {
  const user = await UserRepository.findByEmail(email);
  if (!user) throw new Error('User not found');
  return mapUserForFrontend(user);
};

const updateUser = async (id: string, userData: UpdateUserData, flag: boolean = false) => {
  const user = await UserRepository.findById(id);
  if (!user) throw new Error('User not found');

  if (userData.email && userData.email !== user.email) {
    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) throw new Error('Email already in use');
  }

  let statusAprovacao;
  
  if (flag) {
      statusAprovacao = userData.is_approved;
  } else {
      statusAprovacao = (userData.userType === 'Admin' || userData.userType === 'Sindico') ? true : false;
  }

  const fieldsToUpdate: Partial<IUser> = {
    name: userData.name ?? user.name,
    email: userData.email ?? user.email,
    phone: userData.phone ?? user.phone,
    is_approved: statusAprovacao,
    comprovante_path: userData.comprovante_path ?? user.comprovante_path,
  };

  const updatedUser = await UserRepository.updateUser(id, fieldsToUpdate);

  if (userData.unidades && userData.unidades.length > 0) {
    const unidadeData = userData.unidades[0];
    if (user.unit_id) {
      await UnitRepository.updateUnit(user.unit_id, {
        building: unidadeData.bloco,
        apartment: unidadeData.apartment,
      });
    } else {
      const newUnit = await UnitRepository.createUnit({
        building: unidadeData.bloco,
        apartment: unidadeData.apartment,
      });
      await UserRepository.updateUser(id, { unit_id: newUnit.id });
    }
  }

  return updatedUser;
};

const deleteUser = async (id: string) => {
  const user = await UserRepository.findById(id);
  if (!user) throw new Error('User not found');
  return await UserRepository.deleteUser(id);
};

export default { getAllUsers, getUserByEmail, getUserById, updateUser, deleteUser };
