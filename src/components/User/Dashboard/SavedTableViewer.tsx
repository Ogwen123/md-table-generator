import React from 'react'
import SavedTableCard from './SavedTableCard'
import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import { getAPIUrl, getJWT, hasJWT } from '../../../utils/utils'
import { AlertSeverity, Config, SavedTable, UserData } from '../../../exports/types'
import { Navigate } from 'react-router-dom'

interface SavedTableViewerProps {
    doAlert: (content: string[], severity: AlertSeverity) => void,
    user: UserData | undefined,
    setTableConfig: (config: Config) => void,
}

const SavedTableViewer = ({ doAlert, user, setTableConfig }: SavedTableViewerProps) => {
    const [tables, setTables] = React.useState<never[] | SavedTable[]>([]);
    const [restored, setRestored] = React.useState<Boolean>(false);
    const [tableQuery, setTableQuery] = React.useState<string>("");
    //get users tables
    const fetchTables = (query?: string | undefined) => {
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

        if (!query) {
            axios
                .get(getAPIUrl("table") + "table/get", config)
                .then((response) => {
                    setTables(response.data.data.tables)
                }).catch((err) => {
                    doAlert(["Saved Tables Error", "There was an error fetching your tables."], "error")
                    return
                })
        } else {
            axios
                .post(getAPIUrl("table") + "table/get/query", { query: tableQuery }, config)
                .then((response) => {
                    setTables(response.data.data.tables)
                }).catch((err) => {
                    doAlert(["Saved Tables Error", "There was an error fetching your tables."], "error")
                    return
                })
        }

    }

    const handleRestore = (tableConfig: Config) => {
        setTableConfig(tableConfig)
        setRestored(true)
    }

    const refreshTables = () => {
        if (tableQuery) fetchTables(tableQuery)
        else fetchTables()
    }

    const removeTable = (tableId: string) => {
        const newTables = [];
        for (let i = 0; i < tables.length; i++) {
            if (tables[i]._id !== tableId) {
                newTables.push(tables[i])
            }
        }
        setTables(newTables)
    }

    React.useEffect(() => {
        setTimeout(() => { }, 1000)
        fetchTables()
    }, [])


    if (restored) return <Navigate to="/" />
    else return (
        <Box sx={{
            maxHeight: "1500px",
            overflowY: "auto"
        }}>
            <Box
                sx={{
                    marginBottom: "1rem",
                    marginTop: "0.5rem"
                }}
            >
                <TextField
                    fullWidth
                    focused
                    id="table-search"
                    label="Search Term"
                    type="search"
                    variant="outlined"
                    value={tableQuery}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setTableQuery(event.target.value)
                    }}
                    color="secondary"
                />
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                        fetchTables(tableQuery)
                    }}
                    sx={{
                        width: "73.5%",
                        marginTop: "1rem",
                        marginRight: "1.5%"
                    }}
                >
                    Filter Tables
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                        setTableQuery("")
                        fetchTables()
                    }}
                    sx={{
                        width: "23.5%",
                        marginTop: "1rem",
                        marginLeft: "1.5%"
                    }}
                >
                    Clear Query
                </Button>
            </Box>
            {tables.length === 0 ?
                <Box>{tableQuery ? "No tables matching that query." : "You do not have any saved tables."}</Box>
                :
                tables.map((table, index) => {
                    console.log(tables)
                    return (
                        <Box key={index} sx={{ marginBottom: "0.5rem", backgroundColor: "primary.dark", padding: "1rem", borderRadius: "5px" }}>
                            <SavedTableCard
                                key={index}
                                table={table}
                                handleRestore={handleRestore}
                                doAlert={doAlert}
                                refreshTables={refreshTables}
                                removeTable={removeTable}
                            />
                        </Box>
                    )
                })
            }</Box>
    )
}

export default SavedTableViewer