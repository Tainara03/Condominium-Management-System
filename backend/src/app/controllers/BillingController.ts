import { Request, Response, Router } from "express";
import { CreateBillingService } from "../services/CreateBillingService";
import { AuthRequest, ensureAuthenticated } from "../middlewares/authMiddleware";
import { permit } from "../middlewares/roleMiddleware";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";
import { deflate } from "zlib";
import BillingService from "../services/BillingService";
import { QueryFailedError } from "typeorm";

const BillingRouter = Router();

BillingRouter.get('/', ensureAuthenticated, permit(1), async (req: AuthRequest, res: Response) => {
    try {
        const billings = await BillingService.GetAllBillings(req.user)
        return res.status(200).json(billings);
    } catch (error) {
        console.log(error);
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: 'Query Failed', error: error.message });
        }

        if (error instanceof Error && error.message === 'Not Found') {
            return res.status(404).json({ message: 'Billing not found' });
        }

        if (error instanceof Error && error.message === 'Forbiden') {
            return res.status(403).json({ message: 'Acess Forbiden' });
        }

        //Qualquer outro erro
        return res.status(500).json({ message: 'Internal server error' });

    }
})

BillingRouter.post('/', ensureAuthenticated, permit(2), uploadMiddleware.single('file'), async (req: AuthRequest, res: Response) => {
    const {
        tipo, valor, dataVencimento, descricao,
        modoDestino, blocosSelecionados, apartamentosSelecionados
    } = req.body;

    const createBillingService = new CreateBillingService();

    const blocosArray = typeof blocosSelecionados === 'string' ? blocosSelecionados.split(',') : blocosSelecionados || [];
    const aptosArray = typeof apartamentosSelecionados === 'string' ? apartamentosSelecionados.split(',') : apartamentosSelecionados || [];

    try {
        const result = await createBillingService.execute({
            type: tipo,
            Ammount: Number(valor),
            due_date: dataVencimento,
            description: descricao,
            modoDestino,
            blocosSelecionados: blocosArray,
            apartamentosSelecionados: aptosArray,
            file_path: req.file ? req.file.filename : undefined,
            performed_by: req.user.id
        });

        return res.status(201).json(result);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Erro ao processar cobrança" });
    }
}
)

export default BillingRouter