import { Button, Typography } from '@mui/material'
import React from 'react'
import { AlertSeverity, Config, SavedTable, UserData } from '../../../exports/types'
import { buttonStyling } from '../../../exports/styling'
import axios from 'axios'
import { getAPIUrl, getJWT, hasJWT } from '../../../utils/utils'

interface SavedTableCardProps {
    table: SavedTable,
    handleRestore: (tableConfig: Config) => void,
    doAlert: (content: string[], severity: AlertSeverity) => void,
    refreshTables: () => void,
    user: UserData | undefined,
    deletePressed: string[],
    setDeletePressed: React.Dispatch<React.SetStateAction<string[]>>
}

const SavedTableCard = ({ table, handleRestore, doAlert, refreshTables, user, deletePressed, setDeletePressed }: SavedTableCardProps) => {

    const parseDate = (date: string) => {
        const dateMade = new Date(date)
        return dateMade.toLocaleTimeString() + " " + dateMade.toLocaleDateString()
    }

    const deleteTable = (tableId: string) => {

        fetch(getAPIUrl("table") + "delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user!.token
            },
            body: JSON.stringify({
                table_id: table.id
            })
        }).then((res) => {
            if (!res.ok) {
                doAlert(["Deletion Error", "An error occured when attempting to delete the table. Please try again."], "error")
            } else {
                refreshTables()
            }
        })
    }

    return (
        <div>
            <Typography variant='subtitle1'>{table.name}</Typography>
            <Typography sx={{ fontSize: "10px", color: "lightgrey" }}>{table.id}</Typography>
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
                    if (deletePressed.includes(table.id)) {
                        deleteTable(table.id)
                    } else {
                        setDeletePressed((prev) => ([...prev, table.id]))
                    }

                }}
                color="error"
            >
                {deletePressed.includes(table.id) ? "Press again to confirm" : "Delete"}
            </Button>
        </div>
    )
}


export default SavedTableCard