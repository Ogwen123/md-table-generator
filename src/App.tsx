import React, { useEffect } from 'react'
import { Button, Alert, Collapse, AlertTitle, IconButton } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close"

//component imports
import ConfigBar from './components/DimensionsBar'
import Header from './components/AppBar'
import Output from './components/Output'
import ControlButtons from './components/ControlButtons'
import CollapsableAlert from './components/CollapsableAlert'
import ContentEditor from './components/ContentEditor'

//my imports
import tableConfig from "./config/table.json"
import { Config } from './exports/types'
import { generateCustomTable } from './utils/generateCustomTable'
import CSVInput from './components/CSVInput'


export const defaultConfigState = {
    rows: tableConfig.defaultRows,
    columns: tableConfig.defaultColumns
}

function App() {

    const [tableConfig, setTableConfig] = React.useState<Config>(defaultConfigState)
    const [rowArray, setRowArray] = React.useState<string[]>([])
    const [showContentEditor, setShowContentEditor] = React.useState<boolean>(true)
    const [inputType, setInputType] = React.useState<"custom" | "csv">("custom")

    //alert handling
    const [alertContent, setAlertContent] = React.useState<string[]>(["Uh Oh", "You should never see this"])//title, message
    const [alertSeverity, setAlertSeverity] = React.useState<"error" | "warning" | "info" | "success">("info")
    const [alertOpen, setAlertOpen] = React.useState<boolean>(false)

    const handleGenerate = (customConfig?: Config) => {
        setRowArray(generateCustomTable(customConfig || tableConfig))// if no custom config is passed, use the current config
    }

    useEffect(() => {
        handleGenerate()
    }, [])

    return (
        <div>
            <Header inputType={inputType} setInputType={setInputType} />
            <Alert variant='filled' severity='info' >Content Editor - WIP | CSV - WIP</Alert>
            <CollapsableAlert
                alertContent={alertContent} alertSeverity={alertSeverity} alertOpen={alertOpen}
                setAlertContent={setAlertContent} setAlertSeverity={setAlertSeverity} setAlertOpen={setAlertOpen}
            />
            {inputType === "custom" ?
                <div className="custom-input">
                    <ConfigBar setTableConfig={setTableConfig} tableConfig={tableConfig} />
                    <ContentEditor tableConfig={tableConfig} showEditor={showContentEditor} setShowEditor={setShowContentEditor} />
                </div>
                :
                <div className="csv-input">
                    <CSVInput />
                </div>
            }
            <ControlButtons setTableConfig={setTableConfig} tableConfig={tableConfig} generateTable={handleGenerate} setRowArray={setRowArray} rowArray={rowArray} />
            <Output rowArray={rowArray} />
        </div>
    )
}

export default App
