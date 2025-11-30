import { AppDataSource } from "../../database/data-source";
import Notice from "../entities/Notice";

const noticeRepository = AppDataSource.getRepository(Notice);

const getNotices = () => {
    return noticeRepository.find({
        relations: ["user"],
    });
};

const getNoticesByUser = (user_id: string) => {
    return noticeRepository.find({
        where: { user_id },
        relations: ["user"],
    });
};

const findById = (id: string) => {
    return noticeRepository.findOne({
        where: { id },
        relations: ["user"],
    });
};

const createNotice = async (data: Partial<Notice>) => {
    const notice = noticeRepository.create(data);
    await noticeRepository.save(notice);
    return notice;
};

const updateNotice = async (id: string, data: Partial<Notice>) => {
    await noticeRepository.update(id, data);
    return noticeRepository.findOne({ where: { id } });
};

const deleteNotice = async (id: string) => {
    const result = await noticeRepository.delete(id);
    return result.affected !== 0;
};

export default {
    getNotices,
    getNoticesByUser,
    findById,
    createNotice,
    updateNotice,
    deleteNotice,
};
