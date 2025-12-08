interface IHistory {
    id?: string,
    event_title: string,
    table_name: string,
    event_id: string,
    target_entity?: string,
    created_at: Date,
    performed_by: string,
}

export default IHistory;