import React from 'react'
import { Stack, Paper, Typography, Switch } from '@mui/material'

//project imports
import { Config } from '../exports/types'
import { generalSpacing, paperLabelStyling } from '../exports/styling'
import configFile from "../config/table.json"

interface ContentEditorProps {
    tableConfig: Config,
    setTableConfig: (config: Config) => void,
    showEditor: boolean,
    setShowEditor: (showEditor: boolean) => void,
}

const ContentEditor = ({ tableConfig, setTableConfig, showEditor, setShowEditor }: ContentEditorProps) => {
    const rowNumbers: number[] = [...Array(tableConfig.rows)]//make number array for rows
    const columnNumbers: number[] = [...Array(tableConfig.columns)]//make number array for columns

    let initContentEditable: boolean[][] = Array(configFile.maxRows).fill(Array(configFile.maxColumns).fill(false))//make nested arrays for storing the tables content edtiable states

    const [contentEditableArray, setContentEditableArray] = React.useState<boolean[][]>(initContentEditable)

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
    }

    return (
        <div>
            <div className="content-editor-label">
                <Typography variant="h6" sx={paperLabelStyling} >
                    Content Editor
                </Typography>
                <Switch
                    checked={showEditor}
                    onChange={(e) => setShowEditor(!showEditor)}
                    sx={{ marginTop: "2rem" }}
                />
            </div>
            <Paper elevation={12} variant='elevation' sx={barStyling}>
                {showEditor ?
                    <Stack>
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
                                                return (
                                                    <div
                                                        className={classname}
                                                        onClick={(e) => {
                                                            let newArray = [...contentEditableArray]
                                                            newArray[rowNumber][columnNumber] = true
                                                            setContentEditableArray(newArray)
                                                        }}
                                                        contentEditable={contentEditableArray[rowNumber][columnNumber]}
                                                        suppressContentEditableWarning={true}
                                                        key={rowNumber + "-" + columnNumber}
                                                        id={rowNumber + "-" + columnNumber}
                                                        onBlur={(e) => updateContentStorage(e.currentTarget.id, e.currentTarget.textContent)}
                                                    >
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