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