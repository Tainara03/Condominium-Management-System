"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Reservation_1 = __importDefault(require("../entities/Reservation"));
const data_source_1 = require("../../database/data-source");
const reservationRepository = data_source_1.AppDataSource.getRepository(Reservation_1.default);
const getReservations = () => {
    return reservationRepository.find({ relations: ['user', 'area'] });
};
const findById = (id) => {
    return reservationRepository.findOne({ where: { id }, relations: ['user', 'area'] });
};
const createReservation = async (reservationData) => {
    const newReservation = reservationRepository.create(reservationData);
    await reservationRepository.save(newReservation);
    return newReservation;
};
const updateReservation = async (id, reservationData) => {
    reservationRepository.update(id, reservationData);
    return reservationRepository.findOne({ where: { id }, relations: ['user', 'area'] });
};
const deleteReservation = async (id) => {
    const result = await reservationRepository.delete(id);
    return result.affected !== 0;
};
exports.default = { getReservations, findById, createReservation, updateReservation, deleteReservation };
//# sourceMappingURL=ReservationRepository.js.map