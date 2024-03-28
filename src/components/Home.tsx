import React from 'react'

//component imports
import ConfigBar from './TableGeneration/DimensionsBar'
import Output from './TableGeneration/Output'
import ControlButtons from './TableGeneration/ControlButtons'
import ContentEditor from './TableGeneration/ContentEditor'
import CSVInput from './TableGeneration/CSVInput'

//project imports
import { AlertSeverity, Config, UserData } from '../exports/types'

interface HomeProps {
    inputType: "custom" | "csv",
    tableConfig: Config,
    setTableConfig: (config: Config) => void,
    setDimensionTracker: (dimensionTracker: number[]) => void,
    tableOutput: string,
    setTableOutput: (tableOutput: string) => void,
    csvInputContent: string,
    setCsvInputContent: (content: string) => void,
    delimiter: string,
    setDelimiter: (delimiter: string) => void,
    doAlert: (content: string[], severity: AlertSeverity) => void,
    showContentEditor: boolean,
    setShowContentEditor: (showContentEditor: boolean) => void,
    handleCustomGenerate: (customConfig?: Config | undefined) => void,
    handleCSVGenerate: (csvContent: string, delimiter: string) => void,
    resetTrigger: boolean,
    setResetTrigger: (resetTrigger: boolean) => void
}

const Home = ({
    inputType,
    tableConfig,
    setTableConfig,
    setDimensionTracker,
    tableOutput,
    setTableOutput,
    csvInputContent,
    setCsvInputContent,
    delimiter,
    setDelimiter,
    doAlert,
    showContentEditor,
    setShowContentEditor,
    handleCustomGenerate,
    handleCSVGenerate,
    resetTrigger,
    setResetTrigger,
}: HomeProps) => {

    React.useEffect(() => {
        console.log("test 1")
        console.log(tableOutput)
    }, [tableOutput])

    const updateResetTrigger = () => {
        setResetTrigger(!resetTrigger)
    }

    return (
        <div>
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
                        resetTrigger={resetTrigger}
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
                setTableOutput={setTableOutput}
                tableOutput={tableOutput}
                updateResetTrigger={updateResetTrigger}
                doAlert={doAlert}
                inputType={inputType}
            />
            <Output
                tableOutput={tableOutput}
            />
        </div>
    )
}

export default Home