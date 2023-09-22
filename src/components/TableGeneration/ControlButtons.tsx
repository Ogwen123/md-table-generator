import React from 'react'
import { Button, IconButton, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, useMediaQuery } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useTheme } from '@mui/material/styles'

//project imports
import configFile from "../../config/controlButtons.json"
import { defaultConfigState } from '../../App'
import { AlertSeverity, Config } from '../../exports/types'
import { buttonStyling } from '../../exports/styling'
import axios from 'axios'
import { getAPIUrl } from '../../utils/utils'

interface ControlButtonsProps {
    setTableConfig: (config: Config) => void,
    tableConfig: Config,
    generateTable: any,
    setRowArray: (rowArray: string[]) => void
    rowArray: string[],
    updateResetTrigger: () => void,
    doAlert: (content: string[], severity: AlertSeverity) => void,
    inputType: "custom" | "csv"
}


const ControlButtons = ({ setTableConfig, tableConfig, generateTable, setRowArray, rowArray, updateResetTrigger, doAlert, inputType }: ControlButtonsProps) => {

    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false)
    const [undoConfigState, setUndoConfigState] = React.useState<Config>(defaultConfigState)
    const [undoRowState, setUndoRowState] = React.useState<string[]>([])
    const [snackbarState, setSnackbarState] = React.useState<"reset" | "save" | "">("")

    const [openSaveDialog, setOpenSaveDialog] = React.useState<boolean>(false)
    const [saveName, setSaveName] = React.useState<string>("")
    const [formattedSaveName, setFormattedSaveName] = React.useState<string>("");

    const handleReset = () => {
        //store previous state for undo function
        setUndoConfigState(tableConfig)
        setUndoRowState(rowArray)
        //do reset
        setTableConfig(defaultConfigState)
        setSnackbarState("reset")
        setOpenSnackbar(true)
        generateTable(defaultConfigState)
        updateResetTrigger()
    }

    const handleUndo = () => {
        console.log(undoConfigState)
        setTableConfig(undoConfigState)
        setOpenSnackbar(false)
        setRowArray(undoRowState)
    }

    const handleGenerate = () => {
        generateTable()
    }

    const handleSave = () => {
        const payload = {
            name: saveName,
            type: inputType,
            tableConfig: tableConfig,
        }
        setSaveName("")
        axios
            .post(getAPIUrl("table") + "table/save", payload)
            .then((response) => {
                if (response.status === 204) {
                    doAlert(["Save Table", "Table saved successfully. Saved tables can be viewed on the dashboard."], "success")
                    return
                } else {
                    doAlert(["Error While saving", "Table could not be saved. Please try again."], "error")
                    return
                }
            }).catch((err) => {
                doAlert(["Error while saving", err.response.status + " - " + err.response.data.message], "error")
                return
            })

    }

    const updateSaveName = (saveName: string) => {
        setSaveName(saveName)
        let name = ""
        for (let i = 0; i < saveName.length; i++) {
            if (saveName[i] === " ") {
                name += "-"
            } else {
                name += saveName[i]
            }
        }
        setFormattedSaveName(name)
    }

    const handleDialogClose = () => {
        setOpenSaveDialog(false)
        setSaveName("")
    }

    const snackbarAction = (
        <React.Fragment>
            {snackbarState === "reset" &&
                <Button variant="outlined" color="secondary" onClick={handleUndo} >
                    Undo
                </Button>
            }
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => { setOpenSnackbar(false) }}
            >
                <CloseIcon />
            </IconButton>
        </React.Fragment>
    )

    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <div>
            <Button
                variant="contained"
                sx={{ ...buttonStyling, marginRight: 0 }}
                onClick={handleGenerate}
            >
                Generate
            </Button>
            <Button
                variant="contained"
                sx={{ ...buttonStyling, backgroundColor: "none", marginLeft: "0.5rem", marginRight: 0 }}
                onClick={() => setOpenSaveDialog(true)}
            >
                Save
            </Button>
            <Button
                variant="outlined"
                sx={{ ...buttonStyling, backgroundColor: "none", marginLeft: "0.5rem" }}
                color="error"
                onClick={handleReset}
            >
                Reset
            </Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={configFile.snackBarDuration}
            >
                <Alert action={snackbarAction} variant="filled" severity="info" >{snackbarState === "reset" ? "Table Reset" : "Table Saved"}</Alert>
            </Snackbar>
            <Dialog
                open={openSaveDialog}
                onClose={handleDialogClose}
                fullScreen={fullScreen}
            >
                <DialogTitle>Save Table</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a name for your table.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        label="Table Name"
                        fullWidth
                        sx={{
                            input: {
                                color: "white"
                            },
                            marginTop: "0.5rem"
                        }}
                        value={saveName}
                        onChange={(e) => updateSaveName(e.target.value)}
                    />
                    <DialogContentText>
                        Name: {formattedSaveName}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={() => {
                        setOpenSaveDialog(false)
                        handleSave()
                    }}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ControlButtons