import { Button, Typography } from '@mui/material'
import React from 'react'
import { AlertSeverity, Config, SavedTable } from '../../../exports/types'
import { buttonStyling } from '../../../exports/styling'
import axios from 'axios'
import { getAPIUrl, getJWT, hasJWT } from '../../../utils/utils'

interface SavedTableCardProps {
    table: SavedTable,
    handleRestore: (tableConfig: Config) => void,
    doAlert: (content: string[], severity: AlertSeverity) => void,
    refreshTables: () => void,
    removeTable: (tableId: string) => void
}

const SavedTableCard = ({ table, handleRestore, doAlert, refreshTables, removeTable }: SavedTableCardProps) => {

    const parseDate = (date: string) => {
        const dateMade = new Date(date)
        return dateMade.toLocaleTimeString() + " " + dateMade.toLocaleDateString()
    }

    const handleDelete = (tableId: string) => {
        let config;
        if (hasJWT()) {
            config = {
                headers: {
                    token: getJWT()
                }
            }
        } else {
            config = {}
        }

        axios
            .post(getAPIUrl("table") + "table/delete", { _id: tableId },)
            .then((response) => {
                if (response.status === 204) {
                    doAlert(["Table Deleted", "Table deleted successfully."], "success")
                    return
                } else {
                    doAlert(["Error", response.data.code + " - " + response.data.message], "error")
                    return
                }
            }).catch((err) => {
                if (!err.response) {
                    doAlert(["Error", "An unknown error occured."], "error")
                    return
                }
                doAlert(["Error", err.response.data.code + " - " + err.response.data.message], "error")
                return
            })
    }

    return (
        <div>
            <Typography variant='subtitle1'>{table.name}</Typography>
            <Typography sx={{ fontSize: "10px", color: "lightgrey" }}>{table._id}</Typography>
            <Typography variant='body1'>Type: {table.type}</Typography>
            <Typography variant="body1">Rows: {table.tableConfig.rows}</Typography>
            <Typography variant="body1">Columns: {table.tableConfig.columns}</Typography>
            <Typography variant="body1">Date Made: {parseDate(table.createdAt)}</Typography>
            <Button
                variant="contained"
                sx={{ ...buttonStyling, marginRight: 0, marginLeft: "0.5rem" }}
                onClick={(e) => { handleRestore(table.tableConfig) }}
            >
                Restore
            </Button>
            <Button
                variant="outlined"
                sx={{ ...buttonStyling, marginRight: 0, backgroundColor: "none", marginLeft: "0.5rem" }}
                onClick={() => {
                    handleDelete(table._id)
                    removeTable(table._id)
                    setTimeout(() => { refreshTables() }, 2000)

                }}
                color="error"
            >
                Delete
            </Button>
        </div>
    )
}

export default SavedTableCard