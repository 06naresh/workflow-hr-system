// For API payloads (DB schema)
export interface TimeEntryPayload {
    userId: number;
    startTime: Date;
    endTime: Date | null;
    duration: number;
    description: string;
}

// For frontend display (UI table)
export interface DbTimeEntry {
    id: number;
    userId: number;
    startTime: string;   // API returns ISO string
    endTime: string | null;
    duration: number | null;
    description: string | null;
    createdAt: string;
}