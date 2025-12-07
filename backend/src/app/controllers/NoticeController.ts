import { Request, Response, Router } from 'express';
import { QueryFailedError } from 'typeorm';
import { ensureAuthenticated } from '../middlewares/authMiddleware';
import { permit } from '../middlewares/roleMiddleware';
import NoticeService from '../services/NoticeService';

const noticeRouter = Router();

noticeRouter.post('/', ensureAuthenticated, permit(1), async (req: Request, res: Response) => {
    try {
        const { title, message, user_id, sent_at } = req.body;

        if (!title || !message) {
            return res.status(400).json({ message: 'Dados insuficientes para criar o comunicado' });
        }

        const newNotice = await NoticeService.createNotice({
            title,
            message,
            user_id,
            sent_at
        });

        return res.status(201).json(newNotice);
    } catch (error: any) {
        console.error('ERRO AO CRIAR COMUNICADO:', error);

        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Falha na Query', error: error.message });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
});


noticeRouter.get('/', ensureAuthenticated, permit(1), async (req: Request, res: Response) => {
    try {
        const { id, user_id } = req.query;

        if (id) {
            const notice = await NoticeService.getNoticeById(id as string);
            return res.status(200).json(notice);
        }

        if (user_id) {
            const notices = await NoticeService.getNoticesByUser(user_id as string);
            return res.status(200).json(notices);
        }

        const notices = await NoticeService.getAllNotices();
        return res.status(200).json(notices);
    } catch (error: any) {
        console.error('ERRO AO BUSCAR COMUNICADOS:', error);

        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Falha na Query', error: error.message });
        }

        if (error.message.includes('not found')) {
            return res.status(404).json({ message: error.message });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
});

noticeRouter.put('/:id', ensureAuthenticated, permit(1), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Nenhum dado fornecido para atualização' });
        }

        const updatedNotice = await NoticeService.updateNotice(id, req.body);

        if (!updatedNotice) {
            return res.status(404).json({ message: 'Comunicado não encontrado' });
        }

        return res.status(200).json(updatedNotice);
    } catch (error: any) {
        console.error('ERRO AO ATUALIZAR COMUNICADO:', error);

        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Falha na Query', error: error.message });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
});

noticeRouter.delete('/:id', ensureAuthenticated, permit(1), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deleted = await NoticeService.deleteNotice(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Comunicado não encontrado ou não pôde ser deletado' });
        }

        return res.status(200).json({ message: 'Comunicado deletado com sucesso' });
    } catch (error: any) {
        console.error('ERRO AO DELETAR COMUNICADO:', error);

        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Falha na Query', error: error.message });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default noticeRouter;
