import Reservation from "../entities/Reservation";
import IReservation from "../interfaces/IReservation";
import { AppDataSource } from "../../database/data-source";

const reservationRepository = AppDataSource.getRepository(Reservation);

const getReservations = () => {
    return reservationRepository.find({ relations: ['user', 'area'] });
}

const findById = (id: string) => {
    return reservationRepository.findOne({ where: { id }, relations: ['user', 'area'] });
}

const createReservation = async (reservationData: Partial<Reservation>) => {
    const newReservation = reservationRepository.create(reservationData);
    await reservationRepository.save(newReservation);
    return newReservation;
}

const updateReservation = async (id: string, reservationData: Partial<IReservation>) => {
    reservationRepository.update(id, reservationData);
    return reservationRepository.findOne({ where: { id }, relations: ['user', 'area'] });
}

const deleteReservation = async (id: string) => {
    const result = await reservationRepository.delete(id);
    return result.affected !== 0;
}

export default { getReservations, findById, createReservation, updateReservation, deleteReservation };
