/*
Arquivo que define para o front qual o tipo de arquivo da nossa tabela users
*/

interface INotice {
    id?: string,
    title: string,
    message: string,
    sent_at: Date,
    user_id: string
}

export default INotice;