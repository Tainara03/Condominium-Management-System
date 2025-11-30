import { Request, Response } from "express";
import { CreateBillingService } from "../services/CreateBillingService";

export class BillingController {
    async store(req: Request, res: Response) {
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
                file_path: req.file ? req.file.filename : undefined
            });

            return res.status(201).json(result);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Erro ao processar cobrança" });
        }
    }
}