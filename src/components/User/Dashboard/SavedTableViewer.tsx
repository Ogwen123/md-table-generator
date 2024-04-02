import React from 'react'
import SavedTableCard from './SavedTableCard'
import { Box, Button, TextField } from '@mui/material'
import { getAPIUrl, getJWT, hasJWT } from '../../../utils/utils'
import { AlertSeverity, Config, SavedTable, TableRes, UserData } from '../../../exports/types'
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
    const [deletePressed, setDeletePressed] = React.useState<string[]>([]) // store the ids of the tables which have had delete pressed
    const [resultText, setResultText] = React.useState<string>("Loading...")

    //get users tables
    const fetchTables = (query?: string | undefined) => {
        if (!query) {
            fetch(getAPIUrl("table") + "get", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + user!.token
                },
                body: JSON.stringify({ page: 0 })
            }).then((res) => {
                if (!res.ok) {
                    doAlert(["Saved Tables Error", "There was an error fetching your tables."], "error")
                } else {
                    res.json().then((data) => {
                        const parsedTables = data.data.map((table: TableRes): SavedTable => {

                            let content: { [loc: string]: string } = {}

                            for (let i of table.table_contents) {
                                content[i.location] = i.content
                            }

                            return {
                                id: table.id,
                                createdAt: table.created_at,
                                name: table.name,
                                type: table.type,
                                tableConfig: {
                                    rows: table.rows,
                                    columns: table.columns,
                                    content
                                }
                            }
                        })
                        if (parsedTables.length === 0) setResultText("You do not have any saved tables.")
                        setTables(parsedTables)
                    })
                }
            })
        } else {
            fetch(getAPIUrl("table") + "get/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + user!.token
                },
                body: JSON.stringify({ query: query })
            }).then((res) => {
                if (!res.ok) {
                    doAlert(["Saved Tables Error", "There was an error fetching your tables."], "error")
                } else {
                    res.json().then((data) => {
                        const parsedTables = data.data.map((table: TableRes): SavedTable => {

                            let content: { [loc: string]: string } = {}

                            for (let i of table.table_contents) {
                                content[i.location] = i.content
                            }

                            return {
                                id: table.id,
                                createdAt: table.created_at,
                                name: table.name,
                                type: table.type,
                                tableConfig: {
                                    rows: table.rows,
                                    columns: table.columns,
                                    content
                                }
                            }
                        })
                        if (parsedTables.length === 0) setResultText("You do not have any saved tables.")
                        setTables(parsedTables)
                    })
                }
            })
        }
    }

    React.useEffect(() => {
        if (!user || tables.length > 0) return
        console.log(user)
        fetchTables()
    }, [])

    const handleRestore = (tableConfig: Config) => {
        setTableConfig(tableConfig)
        setRestored(true)
    }

    const refreshTables = () => {
        if (tableQuery) fetchTables(tableQuery)
        else fetchTables()
    }

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
                        width: "calc(75% - 0.5rem)",
                        marginTop: "1rem",
                        marginRight: "0.5rem"
                    }}
                >
                    Search
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                        setTableQuery("")
                        fetchTables()
                    }}
                    sx={{
                        width: "calc(25% - 0.5rem)",
                        marginTop: "1rem",
                        marginLeft: "0.5rem"
                    }}
                >
                    Clear Query
                </Button>
            </Box>
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
            }}>
                {tables.length === 0 ?
                    <Box>{tableQuery ? "No tables matching that query." : resultText}</Box>
                    :
                    tables.map((table, index) => {
                        return (
                            <Box key={index} sx={{
                                marginBottom: "0.5rem",
                                backgroundColor: "primary.dark",
                                padding: "1rem",
                                borderRadius: "5px",
                                width: "30%",
                                marginLeft: (index === 0 ? "0%" : index === tables.length - 1 ? "1.5%" : "1.5%"),
                                marginRight: (index === 0 ? "1.5%%" : index === tables.length - 1 ? "3%" : "1.5%"),

                            }}>
                                <SavedTableCard
                                    key={index}
                                    table={table}
                                    handleRestore={handleRestore}
                                    doAlert={doAlert}
                                    refreshTables={refreshTables}
                                    user={user}
                                    deletePressed={deletePressed}
                                    setDeletePressed={setDeletePressed}
                                />
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default SavedTableViewer