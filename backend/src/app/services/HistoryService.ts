import History from "../entities/history";
import User from "../entities/User";
import HistoryRepository from "../repositories/HistoryRepository";
import { AppDataSource } from "../../database/data-source";


const registerEvent = async (data: Partial<History>) => {
    try {
        return await HistoryRepository.registerEvent(data);
    } catch (error) {
        throw error;
    }
}


//função local - não exportar
const loadEnvent = async (table_name: string, event_id: string) => {

    const repository = AppDataSource.getRepository(table_name);

    // caso a tabela não exista no DataSource
    if (!repository) {
        return null;
    }

    return repository.findOne({
        where: { id: event_id }
    });

}


const getByHistoryId = async (id: string, req_user: any) => {

    const event = await HistoryRepository.findByHistoryId(id);

    if (!event) return null;

    const role_level = req_user.role_level ?? 0;

    console.log(req_user, role_level)
    if (role_level <= 1) {

        const normalize = (v: any) => (v ? String(v).toLowerCase() : null);

        const targetEntity = normalize(event.target_entity);
        const performedBy = normalize(event.performed_by);
        const unitId = normalize(req_user.unit_id);
        const userId = normalize(req_user.id);

        //morador só pode ver evento relacionado ao seu id ou unidade se o target entity não está relacionado ao usuário não retornamos
        const isRelated = targetEntity === unitId || targetEntity === userId || performedBy === userId;

        console.log(targetEntity,unitId,userId,performedBy)
        console.log(isRelated)
        if (!isRelated) return null;
    }

    const eventData = await loadEnvent(event.table_name, event.event_id);
    return { ...event, eventData };
}



const getLastN = async (req_user: any, limit?: number, target_entity?: string, target_table?: string, performed_by_user?: string) => {

    //se usuario lvl 1 filtrar somente pelos targets ids passando unidade
    const role_level = req_user.role_level ?? 0;
    let target = target_entity

    if (role_level <= 1) {
        target = req_user.unit_id;
    }

    const eventsList = await HistoryRepository.findLastN(limit, target, target_table, performed_by_user)

    //faz o mapeamento dos eventos originais e devolve de todos
    const detailed = await Promise.all(
        eventsList.map(async (history) => {
            const event_data = await loadEnvent(
                history.table_name,
                history.event_id
            );

            return {
                ...history,
                event_data
            };
        })
    );


    return detailed;
}


export default { registerEvent, getLastN, getByHistoryId }