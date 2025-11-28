/*
Arquivo que define para o front qual o tipo de arquivo da tabela reservations
*/

interface IReservation {
    id?: string,
    user_id: string,
    area_id: string,
    reservation_date: Date
}

export default IReservation;
