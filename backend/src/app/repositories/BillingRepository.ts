import { AppDataSource } from "../../database/data-source";
import Billing from "../entities/Billing";

const BillingRepository = AppDataSource.getRepository(Billing);


export async function createBilling(data: Partial<Billing>): Promise<Billing> {
    const billing = BillingRepository.create(data);
    return await BillingRepository.save(billing);
}


export async function findBillingById(id: string): Promise<Billing | null> {
    return await BillingRepository.findOne({
        where: { id },
        relations: ["unit"],
    });
}

export async function findAllBillings(): Promise<Billing[]> {
    return await BillingRepository.find({
        relations: ["unit"],
    });
}

export async function findBillingsByUnit(unit_id: string): Promise<Billing[]> {
    return await BillingRepository.find({
        where: { unit_id },
        relations: ["unit"],
    });
}

export async function updateBilling(id: string, data: Partial<Billing>) {
    const billing = await findBillingById(id);
    if (!billing) return null;

    Object.assign(billing, data);
    return await BillingRepository.save(billing);
}

export async function deleteBilling(id: string) {
    await BillingRepository.delete(id);
}

export default { createBilling, findBillingById, findAllBillings, findBillingsByUnit, updateBilling, deleteBilling }