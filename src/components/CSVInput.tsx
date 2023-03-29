import React from 'react'
import { Typography, Paper, Button } from '@mui/material'

//project imports
import { generalSpacing, paperLabelStyling } from '../exports/styling'
import { generateDelimitedTable } from '../utils/generateDelimitedTable'
import { AlertSeverity } from '../exports/types'

interface CSVInputProps {
    csvInputContent: string,
    setCsvInputContent: (cvInputContent: string) => void,
    doAlert: (content: string[], severity: AlertSeverity) => void,
    delimiter: string,
    setDelimiter: (delimiter: string) => void,
}

const CSVInput = ({ csvInputContent, setCsvInputContent, delimiter, setDelimiter }: CSVInputProps) => {

    const handleInputChange = (value: string) => {
        setCsvInputContent(value)
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
            <Typography variant="h6" sx={paperLabelStyling} >
                CSV Input
            </Typography>
            <Paper elevation={12} variant='elevation' sx={barStyling} >
                <form>
                    <p>Delimiter(, | ; etc): </p>
                    <input
                        type='text'
                        className="kdfbgkjd"
                        style={{
                            backgroundColor: "#212121",
                            border: "none",
                            borderRadius: "5px",
                            color: "white"
                        }}//inline because css wasn't working
                        defaultValue={delimiter}
                        onChange={(e) => setDelimiter(e.currentTarget.value.trim())}
                    ></input>
                    <p>CSV Data: </p>
                    <textarea
                        className="csv-textarea"
                        rows={5}
                        cols={300}
                        onChange={(e) => handleInputChange(e.currentTarget.value)}
                    ></textarea>
                </form>
            </Paper>
            <Button onClick={(e) => generateDelimitedTable(csvInputContent, delimiter)} ></Button>
        </div>
    )
}

export default CSVInput