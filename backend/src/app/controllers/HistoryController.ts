import { Request, Response, Router } from "express";
import { AuthRequest, ensureAuthenticated } from "../middlewares/authMiddleware";
import { permit } from "../middlewares/roleMiddleware";
import HistoryService from "../services/HistoryService";
import { QueryFailedError } from "typeorm";
import { log } from "console";
import History from "../entities/history";

const historyRouter = Router();

//historico completo, todo eventos relacionado ao usuario
historyRouter.get('/', ensureAuthenticated, permit(1), async (req: AuthRequest, res: Response) => {
    try {

        const events = await HistoryService.getLastN(req.user);

        return res.status(200).json(events);
    } catch (error) {
        console.error(error);

        if (error instanceof QueryFailedError) {
            return res.status(400).json({
                message: "Query failed",
                error: error.message
            });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
})

//historico baseado em filtros
historyRouter.post('/', ensureAuthenticated, permit(1), async (req: AuthRequest, res: Response) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Bad request: request params are missing" });
        }
        const { limit, target_entity, target_table, performed_by } = req.body;

        const events = await HistoryService.getLastN(
            req.user,
            limit ? Number(limit) : undefined,
            target_entity as string,
            target_table as string,
            performed_by as string
        );

        return res.status(200).json(events);
    } catch (error) {
        console.error(error);

        if (error instanceof QueryFailedError) {
            return res.status(400).json({
                message: "Query failed",
                error: error.message
            });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
});

historyRouter.get('/:id', ensureAuthenticated, permit(1), async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Missing id parameter" });
        }


        const event = await HistoryService.getByHistoryId(id, req.user);

        if (!event) {
            return res.status(404).json({ message: "History record not found" });
        }

        return res.status(200).json(event);

    } catch (error) {
        console.error(error);

        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Query failed', error: error.message });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
}
);


export default historyRouter


