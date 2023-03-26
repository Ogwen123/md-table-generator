import React from 'react'
import { Stack, Paper, Typography, Switch } from '@mui/material'

//project imports
import { Config } from '../exports/types'
import { generalSpacing, paperLabelStyling } from '../exports/styling'

interface ContentEditorProps {
    tableConfig: Config,
    showEditor: boolean,
    setShowEditor: (showEditor: boolean) => void
}

const ContentEditor = ({ tableConfig, showEditor, setShowEditor }: ContentEditorProps) => {

    const [contentStorage, setContentStorage] = React.useState<string[][]>([[]])

    //make number array for rows
    const rowNumbers: number[] = [...Array(tableConfig.rows + 1)]

    //make number array for columns
    const columnNumbers: number[] = [...Array(tableConfig.columns)]

    const updateContentStorage = (id: string, content: string | null) => {
        let row = parseInt(id.split("-")[0])
        let column = parseInt(id.split("-")[1])
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
                                                return (
                                                    <div
                                                        className={classname}
                                                        onClick={(e) => e.currentTarget.contentEditable = "true"}
                                                        key={rowNumber + "-" + columnNumber}
                                                        id={rowNumber + "-" + columnNumber}
                                                        onInput={(e) => updateContentStorage(e.currentTarget.id, e.currentTarget.textContent)}
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