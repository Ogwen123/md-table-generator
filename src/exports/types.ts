export type Config = {
    rows: number,
    columns: number,
    content: Record<string, string>
}

export type AlertSeverity = "error" | "warning" | "info" | "success"

export module ConfigTypes {
    export type ConfigBar = {
        defaultRows: number,
        defaultColumns: number
    }
}

export type UserData = {
    token: string,
    username?: string,
    permissions?: string[],
    name?: string
}

export type SavedTable = {
    _id: string,
    createdAt: string,
    name: string,
    type: string,
    tableConfig: Config
}