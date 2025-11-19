/*
Arquivo que define para o front qual o tipo de arquivo da nossa tabela users
*/

interface IUser {
    id?: string,
    name: string,
    email: string,
    password_hash: string,
    phone?: string,
    role_id: number,
    unit_id: string,
    is_active: boolean
}

export default IUser;