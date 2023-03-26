export type Config = {
    rows: number,
    columns: number
}

export type AlertSeverity = "error" | "warning" | "info" | "success"

export module ConfigTypes {
    export type ConfigBar = {
        defaultRows: number,
        defaultColumns: number
    }
}