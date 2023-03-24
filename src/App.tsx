import React from 'react'
import { Button } from '@mui/material'

//component imports
import ConfigBar from './components/DimensionsBar'
import NavigationBar from './components/NavigationBar'
import Output from './components/Output'
import ControlButtons from './components/ControlButtons'

//my imports
import configFile from "./config/table.json"
import { Config } from './exports/types'
import { buttonStyling } from './exports/globalStyling'
import { generateTable } from './generateTable'

export const defaultConfigState = {
    rows: configFile.defaultRows,
    columns: configFile.defaultColumns
}

function App() {

    const [tableConfig, setTableConfig] = React.useState<Config>(defaultConfigState)
    const [rowArray, setRowArray] = React.useState<string[]>([])

    const handleGenerate = () => {
        setRowArray(generateTable(tableConfig))
    }

    return (
        <div>
            <NavigationBar />
            <ConfigBar setTableConfig={setTableConfig} tableConfig={tableConfig} />
            <ControlButtons setTableConfig={setTableConfig} tableConfig={tableConfig} generateTable={handleGenerate} setRowArray={setRowArray} rowArray={rowArray} />
            <Output rowArray={rowArray} />
        </div>
    )
}

export default App
