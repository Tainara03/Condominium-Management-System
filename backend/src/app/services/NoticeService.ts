import NoticeRepository from "../repositories/NoticeRepository";
import INotice from "../interfaces/INotice";
import History from "./HistoryService";

const getNoticeById = async (id: string) => {
    try {
        const notice = await NoticeRepository.findById(id);
        if (!notice) {
            throw new Error("Notice not found");
        }
        return notice;
    } catch (error) {
        throw error;
    }
};

const getNoticesByUser = async (user_id: string) => {
    try {
        const notices = await NoticeRepository.getNoticesByUser(user_id);
        return notices;
    } catch (error) {
        throw error;
    }
};

const getAllNotices = async () => {
    try {
        const notices = await NoticeRepository.getNotices();
        return notices;
    } catch (error) {
        throw error;
    }
};

const createNotice = async (data: Partial<INotice>) => {
    try {
        const newNotice = await NoticeRepository.createNotice(data);
        if (newNotice) {
            await History.registerEvent({
                event_title: 'Novo Comunicado',
                table_name: 'notices',
                event_id: newNotice.id,
                target_entity: newNotice.user_id,
                performed_by: newNotice.user_id
            });
        }
        return newNotice;
    } catch (error) {
        throw error;
    }
};

const updateNotice = async (id: string, data: Partial<INotice>) => {
    try {
        const notice = await NoticeRepository.findById(id);

        if (!notice) {
            throw new Error("Notice not found");
        }

        const updated = await NoticeRepository.updateNotice(id, data);
        return updated;
    } catch (error) {
        throw error;
    }
};

const deleteNotice = async (id: string) => {
    try {
        const notice = await NoticeRepository.findById(id);

        if (!notice) {
            throw new Error("Notice not found");
        }

        const deleted = await NoticeRepository.deleteNotice(id);
        return deleted;
    } catch (error) {
        throw error;
    }
};

export default {
    getNoticeById,
    getNoticesByUser,
    getAllNotices,
    createNotice,
    updateNotice,
    deleteNotice,
};