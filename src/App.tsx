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
import configFile from "./config/table.json"
import { Config, AlertSeverity } from './exports/types'
import { generateCustomTable } from './utils/generateCustomTable'
import CSVInput from './components/CSVInput'
import { generateDelimitedTable } from './utils/generateDelimitedTable'

let initContentStorage: Record<string, string> = { "0-0": "", "1-0": "" };

export const defaultConfigState = {
    rows: configFile.defaultRows + 1,
    columns: configFile.defaultColumns,
    content: initContentStorage
}

function App() {

    const [tableConfig, setTableConfig] = React.useState<Config>(defaultConfigState)
    const [rowArray, setRowArray] = React.useState<string[]>([])
    const [showContentEditor, setShowContentEditor] = React.useState<boolean>(true)
    const [inputType, setInputType] = React.useState<"custom" | "csv">("custom")

    //custom specific
    const [dimensionTracker, setDimensionTracker] = React.useState<number[]>([2, 1])//used to force a re-render when dimensions are changed

    //csv specific
    const [delimiter, setDelimiter] = React.useState<string>(",")
    const [csvInputContent, setCsvInputContent] = React.useState<string>("")

    //alert handling
    const [alertContent, setAlertContent] = React.useState<string[]>(["Uh Oh", "You should never see this"])//title, message
    const [alertSeverity, setAlertSeverity] = React.useState<AlertSeverity>("info")
    const [alertOpen, setAlertOpen] = React.useState<boolean>(false)

    //update content object when more rows or columns are added
    React.useEffect(() => {
        let newContentStorage: Record<string, string> = {}
        for (let row = 0; row < tableConfig.rows; row++) {
            for (let column = 0; column < tableConfig.columns; column++) {
                newContentStorage[`${row}-${column}`] = tableConfig.content[`${row}-${column}`] || ""
            }
        }
        setTableConfig({ ...tableConfig, content: newContentStorage })
    }, [dimensionTracker])

    const handleCustomGenerate = (customConfig?: Config) => {
        const rowArray = generateCustomTable(customConfig || tableConfig)
        if (rowArray[1] === false) setRowArray([rowArray[0]])
        else setRowArray(rowArray)// if no custom config is passed, use the current config
    }

    const handleCSVGenerate = () => {
        const rowArray = generateDelimitedTable(csvInputContent, delimiter)
        if (rowArray[1] === false) setRowArray([rowArray[0]])
        else setRowArray(rowArray)
    }

    const doAlert = (content: string[], severity: AlertSeverity) => {
        if (content.length !== 2) return
        setAlertContent(content)
        setAlertSeverity(severity)
        setAlertOpen(true)
    }

    useEffect(() => {
        if (inputType === "custom") handleCustomGenerate()
        else handleCSVGenerate()
    }, [])

    return (
        <div>
            <Header inputType={inputType} setInputType={setInputType} />
            {/*<Alert variant='filled' severity='info' >Content Editor - WIP</Alert>*/}
            <CollapsableAlert
                alertContent={alertContent}
                alertSeverity={alertSeverity}
                alertOpen={alertOpen}
                setAlertContent={setAlertContent}
                setAlertSeverity={setAlertSeverity}
                setAlertOpen={setAlertOpen}
            />
            {inputType === "custom" ?
                <div className="custom-input">
                    <ConfigBar
                        setTableConfig={setTableConfig}
                        tableConfig={tableConfig}
                        setDimensionTracker={setDimensionTracker}
                    />
                    <ContentEditor
                        tableConfig={tableConfig}
                        setTableConfig={setTableConfig}
                        showEditor={showContentEditor}
                        setShowEditor={setShowContentEditor}
                    />
                </div>
                :
                <div className="csv-input">
                    <CSVInput
                        csvInputContent={csvInputContent}
                        setCsvInputContent={setCsvInputContent}
                        doAlert={doAlert}
                        delimiter={delimiter}
                        setDelimiter={setDelimiter}
                    />
                </div>
            }
            <ControlButtons
                setTableConfig={setTableConfig}
                tableConfig={tableConfig}
                generateTable={inputType === "custom" ? handleCustomGenerate : handleCSVGenerate}
                setRowArray={setRowArray}
                rowArray={rowArray}
            />
            <Output
                rowArray={rowArray}
            />
        </div>
    )
}

export default App
