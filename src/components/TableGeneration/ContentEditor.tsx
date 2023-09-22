import React from 'react'
import { Stack, Paper, Typography, Switch, FormGroup, Tooltip, FormControlLabel } from '@mui/material'

//project imports
import { Config } from '../../exports/types'
import { generalSpacing, paperLabelStyling } from '../../exports/styling'
import configFile from "../../config/table.json"

interface ContentEditorProps {
    tableConfig: Config,
    setTableConfig: (config: Config) => void,
    showEditor: boolean,
    setShowEditor: (showEditor: boolean) => void,
    resetTrigger: boolean
}

const ContentEditor = ({ tableConfig, setTableConfig, showEditor, setShowEditor, resetTrigger }: ContentEditorProps) => {
    const rowNumbers: number[] = [...Array(tableConfig.rows)]//make number array for rows
    const columnNumbers: number[] = [...Array(tableConfig.columns)]//make number array for columns

    let initContentEditable: boolean[][] = Array(configFile.maxRows).fill(Array(configFile.maxColumns).fill(false))//make nested arrays for storing the tables content edtiable states

    const [contentEditableArray, setContentEditableArray] = React.useState<boolean[][]>(initContentEditable)

    React.useEffect(() => {
        setContentEditableArray(initContentEditable)
    }, [resetTrigger])

    const updateContentStorage = (id: string, content: string | null) => {
        if (content === null) return
        let row = parseInt(id.split("-")[0])
        let column = parseInt(id.split("-")[1])
        if (isNaN(row) || isNaN(column)) return
        setTableConfig({ ...tableConfig, content: { ...tableConfig.content, [id]: content } })
    }

    const makeClassName = (rowNumber: number, columnNumber: number): string => {
        let classname = "content-editor-cell"
        //change appearance of headers
        if (rowNumber === 0) {
            classname += " content-editor-cell-header"
        }
        //round corners of outer cells
        if (rowNumber === 0) {
            if (columnNumber === 0) {
                classname += " content-editor-tl"
            }
            if (columnNumber === columnNumbers.length - 1) {
                classname += " content-editor-tr"
            }
        }
        if (rowNumber === rowNumbers.length - 1) {
            if (columnNumber === 0) {
                classname += " content-editor-bl"
            }
            if (columnNumber === columnNumbers.length - 1) {
                classname += " content-editor-br"
            }
        }
        return classname
    }

    const barStyling = {
        ...generalSpacing,
        backgroundColor: "primary.main",
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        overflow: "auto"
    }

    let columnLetters: string = " ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    return (
        <div>
            <div className="content-editor-label">
                <Typography variant="h6" sx={paperLabelStyling} >
                    Content Editor
                </Typography>
                <Tooltip title={showEditor ? "This will delete your content" : "Turn on editor"}>
                    <Switch
                        checked={showEditor}
                        onChange={(e) => setShowEditor(!showEditor)}
                        sx={{ marginTop: "2rem" }}
                    />
                </Tooltip>

            </div>
            <Paper elevation={12} variant='elevation' sx={barStyling}>
                {showEditor ?
                    <Stack>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "40px" }}></div>
                            {/*column letters */
                                columnNumbers.map((ph, columnNumber) => {
                                    //work out the letter(s) needed
                                    const columnSectorIndex = Math.floor(columnNumber / 26)
                                    const columnLetterIndex = columnNumber % 26 + 1
                                    const letters = columnLetters[columnSectorIndex] + columnLetters[columnLetterIndex]
                                    return (
                                        <div
                                            style={{ display: "flex", width: "100px", justifyContent: "center" }}
                                            key={letters}
                                        >
                                            {letters}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {
                            rowNumbers.map((ph, rowNumber) => {
                                let classname = "content-editor-row"
                                if (rowNumber === 0) {
                                    classname += " content-editor-row-header"
                                }
                                return (
                                    <div
                                        className={classname}
                                        key={rowNumber}
                                    >
                                        {
                                            columnNumbers.map((ph, columnNumber) => {
                                                let classname = makeClassName(rowNumber, columnNumber)
                                                const firstColumn = columnNumber === 0 ? true : false
                                                return (
                                                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }} key={rowNumber + "-" + columnNumber} >
                                                        {firstColumn &&
                                                            <div
                                                                style={{ display: "flex", flexDirection: "row", justifyContent: "right", width: "40px", paddingRight: "5px" }}
                                                                key={rowNumber + 1}
                                                            >
                                                                {rowNumber + 1}
                                                            </div>
                                                        }
                                                        <div
                                                            className={classname}
                                                            onClick={(e) => {
                                                                let newArray = [...contentEditableArray!]
                                                                newArray[rowNumber][columnNumber] = true
                                                                setContentEditableArray(newArray)
                                                                e.currentTarget.className += " active-cell"
                                                            }}
                                                            contentEditable={contentEditableArray![rowNumber][columnNumber]}
                                                            suppressContentEditableWarning={true}
                                                            key={rowNumber + "-" + columnNumber}
                                                            id={rowNumber + "-" + columnNumber}
                                                            onBlur={(e) => {
                                                                updateContentStorage(e.currentTarget.id, e.currentTarget.textContent)
                                                                e.currentTarget.className = e.currentTarget.className.replaceAll(" active-cell", "")
                                                            }
                                                            }
                                                        >
                                                            {tableConfig.content[rowNumber + "-" + columnNumber]}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </Stack>
                    :
                    <p>Toggle Switch to re-enable editor.</p>
                }
            </Paper>
        </div>
    )
}

export default ContentEditor