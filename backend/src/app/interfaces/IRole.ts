/*
Arquivo que define para o front qual o tipo de arquivo da nossa tabela users
*/

interface IRole {
    id?: number,
    role: string,
    level: number
}

export default IRole;