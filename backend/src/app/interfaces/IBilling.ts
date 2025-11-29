interface IBilling {
    id?: string,
    ammount: number,
    due_date: Date,
    is_paid: boolean,
    paid_at?: Date,
    description?: string,
    unit_id: string
}

export default IBilling;