/*
Arquivo que define para o front qual o tipo de arquivo da nossa tabela users
*/

interface IPackage {
    id?: string,
    title: string,
    message: Date,
    sent_at: string,
    user_id: string
}

export default IPackage;