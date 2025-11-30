import { AppDataSource } from "../../database/data-source";
import Billing from "../entities/Billing";
import Unit from "../entities/Unit";
import { In } from "typeorm";

interface IRequest {
    type: string;
    Ammount: number;
    due_date: string;
    description: string;
    modoDestino: string;
    blocosSelecionados: string[];
    apartamentosSelecionados: string[];
    file_path?: string;
}

export class CreateBillingService {
    async execute({ type, Ammount, due_date, description, modoDestino, blocosSelecionados, apartamentosSelecionados, file_path }: IRequest) {
        
        const billingRepository = AppDataSource.getRepository(Billing);
        const unitRepository = AppDataSource.getRepository(Unit);

        let units: Unit[] = [];

        if (modoDestino === 'Todos') {
            units = await unitRepository.find();
        } 
        else if (modoDestino === 'Blocos') {
            units = await unitRepository.find({
                where: { building: In(blocosSelecionados) }
            });
        } 
        else if (modoDestino === 'Unidades') {
            units = await unitRepository.find({
                where: { 
                    building: In(blocosSelecionados),
                    apartment: In(apartamentosSelecionados) 
                }
            });
        }

        if (units.length === 0) {
            throw new Error("Nenhuma unidade encontrada para os critérios selecionados.");
        }

        const billingsToSave = units.map(unit => {
            return billingRepository.create({
                ammount: Ammount,
                due_date: new Date(due_date),
                description: description,
                file_path: file_path,
                unit_id: unit.id, 
                is_paid: false
            });
        });

        await billingRepository.save(billingsToSave);

        return { message: `${billingsToSave.length} cobranças geradas com sucesso!` };
    }
}