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

export type AuthResponse = {
    success: boolean,
    token: string,
    user: {
        _id: string,
        email: string,
        flags: string[],
    }
}

export type UserData = {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    flags: string[],
    token: string
}

export type SavedTable = {
    _id: string,
    createdAt: string,
    name: string,
    type: string,
    tableConfig: Config
}