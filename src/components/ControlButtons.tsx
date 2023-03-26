import React from 'react'
import { Button, IconButton, Snackbar, Alert } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

//component imports
import ConfigBar from './DimensionsBar'
import NavigationBar from './AppBar'
import Output from './Output'

//project imports
import configFile from "../config/controlButtons.json"
import { defaultConfigState } from '../App'
import { Config } from '../exports/types'
import { buttonStyling } from '../exports/styling'

interface ControlButtonsProps {
    setTableConfig: (config: Config) => void,
    tableConfig: Config,
    generateTable: (customConfig?: Config) => void,
    setRowArray: (rowArray: string[]) => void
    rowArray: string[]
}


const ControlButtons = ({ setTableConfig, tableConfig, generateTable, setRowArray, rowArray }: ControlButtonsProps) => {

    const [openResetSnackbar, setOpenResetSnackbar] = React.useState<boolean>(false)
    const [undoConfigState, setUndoConfigState] = React.useState<Config>(defaultConfigState)
    const [undoRowState, setUndoRowState] = React.useState<string[]>([])

    const handleReset = () => {
        //store previous state for undo function
        setUndoConfigState(tableConfig)
        setUndoRowState(rowArray)
        //do reset
        setTableConfig(defaultConfigState)
        setOpenResetSnackbar(true)
        generateTable(defaultConfigState)
    }

    const handleUndo = () => {
        setTableConfig(undoConfigState)
        setOpenResetSnackbar(false)
        setRowArray(undoRowState)
    }

    const handleGenerate = () => {
        generateTable()
    }

    const snackbarAction = (
        <React.Fragment>
            <Button variant="outlined" color="secondary" onClick={handleUndo} >
                Undo
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => { setOpenResetSnackbar(false) }}
            >
                <CloseIcon />
            </IconButton>
        </React.Fragment>
    )

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
                variant="outlined"
                sx={{ ...buttonStyling, backgroundColor: "none", marginLeft: "0.5rem" }}
                color="error"
                onClick={handleReset}
            >
                Reset
            </Button>
            <Snackbar
                open={openResetSnackbar}
                autoHideDuration={configFile.resetSnackBarDuration}
            >
                <Alert action={snackbarAction} variant="filled" severity="info" >Reset Table</Alert>
            </Snackbar>
        </div>
    )
}

export default ControlButtons