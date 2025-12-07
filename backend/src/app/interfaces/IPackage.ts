/*
Arquivo que define para o front qual o tipo de arquivo da nossa tabela users
*/

interface IPackage {
    id?: string,
    description: string,
    received_at: Date,
    status: string,
    unit_id: string
}

export default IPackage;