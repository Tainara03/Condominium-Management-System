import { Request, Response } from "express";
import { CreateBillingService } from "../services/CreateBillingService";
import { AppDataSource } from "../../database/data-source";
import Billing from "../entities/Billing";
import { Not } from "typeorm";

export class BillingController {
    async index(req: Request, res: Response) {
        try {
            const billingRepository = AppDataSource.getRepository(Billing);
            const billings = await billingRepository.find({
                relations: ["unit"], 
                where: {
                    unit: {
                        building: Not('Administração'),
                        apartment: Not('1')
                    }
                },
                order: { due_date: "DESC" }
            });

            return res.json(billings);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao listar cobranças" });
        }
    }

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