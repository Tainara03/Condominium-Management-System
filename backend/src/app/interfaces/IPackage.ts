/*
Arquivo que define para o front qual o tipo de arquivo da nossa tabela users
*/

interface IPackage {
    id?: string,
    description: string,
    decived_at: Date,
    status: string,
    user_id: string
}

export default IPackage;