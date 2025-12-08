import { AppDataSource } from "../../database/data-source";
import History from "../entities/history";



const HistoryRepository = AppDataSource.getRepository(History);

const findByHistoryId = async (id: string) => {
    return HistoryRepository.findOne({ where: { id } });
}

//função para puxar ultimos n eventos baseado em filtro: target_entity, target_table, target_user
//se o limit não for passado devolve todos os registros
const findLastN = async (limit?: number, target_entity?: string, target_table?: string, performed_by_user?: string) => {
    //se não há filtros devolve tudo que há na tabela
    return HistoryRepository.find({
        where: {
            ...(target_entity && { target_entity: target_entity }),
            ...(target_table && { table_name: target_table }),
            ...(performed_by_user && { performed_by: performed_by_user })
        },
        order: { created_at: "DESC" },
        ...(limit !== undefined && { take: limit }) 
    })
}

const registerEvent = async (data: Partial<History>) =>{
    const newRegister = HistoryRepository.create(data);
    await HistoryRepository.save(newRegister);
    return newRegister;

}

export default { findByHistoryId, findLastN, registerEvent };