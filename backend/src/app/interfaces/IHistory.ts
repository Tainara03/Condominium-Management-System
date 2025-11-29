interface IHistory {
    id?: string,
    table_name: string,
    event_id: string,
    created_at: Date,
    performed_by: string,
}

export default IHistory;