import { deflate } from "zlib";
import Billing from "../entities/Billing";
import BillingRepository from "../repositories/BillingRepository";

function isPrivileged(user: any) {
    const role_level = user.role_level ?? 0;
    return role_level >= 2; // síndico ou admin
}


export async function GetAllBillings(requestUser: any) {
    if (isPrivileged(requestUser)) {
        return await BillingRepository.findAllBillings();
    }

    return await BillingRepository.findBillingsByUnit(requestUser.unit_id);
}


export async function GetbillingById(id: string, requestUser: any) {
    const billing = await BillingRepository.findBillingById(id);
    if (!billing) return null;

    if (!isPrivileged(requestUser) && billing.unit_id !== requestUser.unit_id) {
        throw new Error("Forbiden");
    }

    return billing;
}

export async function Updatebilling(id: string, data: Partial<Billing>, requestUser: any) {
    const billing = await BillingRepository.findBillingById(id);
    if (!billing) throw new Error("Not Found");

    if (!isPrivileged(requestUser)) {
        throw new Error("Forbiden");
    }

    return await BillingRepository.updateBilling(id, data);
}

export async function billingDeleteService(id: string, requestUser: any) {
    const billing = await BillingRepository.findBillingById(id);
    if (!billing) throw new Error("Not Found");

    if (!isPrivileged(requestUser)) {
        throw new Error("Forbiden");
    }

    await BillingRepository.deleteBilling(id);
}


export default { GetAllBillings, GetbillingById, Updatebilling, billingDeleteService }